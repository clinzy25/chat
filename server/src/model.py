import time

messages = [
        {
            'content': 'Helloooo',
            'from': 'user1',
            'to': 'user2',
            'createTs': time.time()
        },
        {
            'content': 'Hows it going',
            'from': 'user2',
            'to': 'user1',
            'createTs': time.time() + 1
        },
        {
            'content': 'Good',
            'from': 'user1',
            'to': 'user2',
            'createTs': time.time() + 2
        },
    ]
        