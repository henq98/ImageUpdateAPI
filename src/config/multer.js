const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    // Qual o destino do arquivo quando enviado
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                // Mudar nome criptografado pelo crypto para hexadecimal
                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        }
    }),
    limits: { // Delimitar limites para o upload de arquivo
        fileSize: 2 * 1024 * 1024 // 2Mega
    },
    fileFilter: (req, file, cb) => { // Filtrar upload de arquivo
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
};