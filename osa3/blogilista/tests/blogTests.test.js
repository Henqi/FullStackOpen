const dummy = require('../utils/list_helper').dummy

test('dummy returns one', () => {
    const blogs = [
        {"title": "Books and how to deal with them",
        "author": "Laura",
        "url": "example.com",
        "likes": 1335,
        "id": "63f636983285ce306c83ba07"
        }
    ]
    const result = dummy(blogs)
    expect(result).toBe(1)
})