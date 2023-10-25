const arr = [
    {text: 'Hello', isRead: true},
    {text: 'Bye', isRead: false},
]

const filtered = arr.filter(item => !item.isRead)

console.log(filtered)