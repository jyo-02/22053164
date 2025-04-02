// utils/dataProcessor.js

// Process and return top 5 users with the most posts
export const processTopUsers = (users) => {
    const userPostCounts = {};

    users.forEach(user => {
        userPostCounts[user.id] = user.posts.length;
    });

    return Object.entries(userPostCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([userId]) => users.find(user => user.id === parseInt(userId)));
};

// Process and return top post(s) with the maximum number of comments
export const processTopPosts = (posts) => {
    const postCommentsCount = {};

    posts.forEach(post => {
        postCommentsCount[post.id] = post.comments.length;
    });

    const maxCommentCount = Math.max(...Object.values(postCommentsCount));

    return posts.filter(post => post.comments.length === maxCommentCount);
};

// Process and return the latest 5 posts sorted by timestamp
export const processLatestPosts = (posts) => {
    return posts
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
};
