export const images = new Array(12).fill(1).map((_, i) => `tile${i}.png`);

export const getImages = () => {
    const _images = images.map(e => ({ c: 2, e }));
    const _collection = [];
    for (let i = 0; i < 24; i++) {
        const id = Math.floor(Math.random() * (_images.length - 1));
        const _image = _images[id]
        _image.c--;
        if (_image.c <= 0) _images.splice(id, 1);
        _collection.push({
            id: Math.random(),
            img: _image.e,
            hidden: true,
            done: false,
        });
    }
    return _collection;
}