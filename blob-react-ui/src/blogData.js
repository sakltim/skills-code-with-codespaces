export const blobArr = [
    { id: 1, title: 'Title 1', description: 'Text Paragraph 1, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' },
    { id: 2, title: 'Title 2', description: 'Text Paragraph 2, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' },
    { id: 3, title: 'Title 3', description: 'Text Paragraph 3, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' },
    { id: 5, title: 'Title 4', description: 'Text Paragraph 4, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' },
    { id: 4, title: 'Title 5', description: 'Text Paragraph 5, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' }
];

export function addBlog(id, title, description) {
    blobArr.push({ id, title, description });
}