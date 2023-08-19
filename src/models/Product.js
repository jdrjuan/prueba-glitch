class Product {

    constructor({title, description, code, price, status, stock, category, thumbnails}) {
        this.id = undefined;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }

    static #validations = {

        id: p => {
            if (p.id === undefined) {
                throw new Error('Id is mandatory.');
            }
            // const test = /^[1-9]\d*$/.test(p.id);
            const test = typeof p.id === 'number' && p.id > 0;
            if (!test) {
                throw new Error('Id must be a positive number.');
            }
            return true;
        },

        title: p => {
            if (p.title === undefined) {
                throw new Error('Title is mandatory.');
            }
            // const test = /^.{1,30}$/.test(p.title);
            if (typeof p.title !== 'string') {
                throw new Error('Title must be of type string.');
            }
            const trimmedValue = p.title.trim();
            const titleLength = trimmedValue.length;
            if (titleLength < 1 || titleLength > 30) {
                throw new Error('Title must be 1 to 30 characters long.');
            }
            return true;
        },

        description: p => {
            if (p.description === undefined) {
                throw new Error('Description is mandatory.');
            }
            // const test = /^.{1,100}$/.test(p.description);
            if (typeof p.description !== 'string') {
                throw new Error('Description must be of type string.');
            }
            const trimmedValue = p.description.trim();
            const descriptionLength = trimmedValue.length;
            if (descriptionLength < 1 || descriptionLength > 100) {
                throw new Error('Description must be 1 to 100 characters long.');
            }
            return true;
        },

        code: p => {
            if (p.code === undefined) {
                throw new Error('Code is mandatory.');
            }
            // const test = /^.{3,10}$/.test(p.code);
            if (typeof p.code !== 'string') {
                throw new Error('Code must be of type string.');
            }
            const trimmedValue = p.code.trim();
            const codeLength = trimmedValue.length;
            if (codeLength < 3 || codeLength > 10) {
                throw new Error('Code must be 3 to 10 characters long.');
            }
            return true;
        },

        price: p => {
            if (p.price === undefined) {
                throw new Error('Price is mandatory.');
            }
            // const test = /^0$|^[1-9]\d*$/.test(p.price);
            if (typeof p.price !== 'number') {
                throw new Error('Price must be of type number.');
            }
            if (p.price < 0) {
                throw new Error('Price can\'t be negative.');
            }
            return true;
        },

        status: p => {
            if (p.status === undefined) {
                throw new Error('Status is mandatory.');
            }
            if (typeof p.status !== 'boolean') {
                throw new Error('Status must be of type boolean.');
            }
            return true;
        },

        category: p => {
            if (p.category === undefined) {
                throw new Error('Category is mandatory.');
            }
            // const test = /^.{1,50}$/.test(p.category);
            if (typeof p.category !== 'string') {
                throw new Error('Category must be of type string.');
            }
            const trimmedValue = p.category.trim();
            const categoryLength = trimmedValue.length;
            if (categoryLength < 1 || categoryLength > 50) {
                throw new Error('Category must be 1 to 50 characters long.');
            }
            return true;
        },

        stock: p => {
            if (p.stock === undefined) {
                throw new Error('Stock is mandatory.');
            }
            // const test = /^0$|^-?[1-9]\d*$/.test(p.stock);
            if (typeof p.stock !== 'number') {
                throw new Error('Stock must be of type number.');
            }
            if (Math.round(p.stock) !== p.stock) {
                throw new Error('Stock must be an integer number.');
            }
            return true;
        },

        thumbnails: p => {
            if (p.thumbnails === undefined) {
                throw new Error('Thumbnails is mandatory.');
            }
            const test = Array.isArray(p.thumbnails);
            if (!test) {
                throw new Error('Thumbnails must be an array.');
            }
            return true;
        },

    };

    static areAllPropertiesValid(product) {
        console.log('Validating product data:');
        try {
            for (let validation in Product.#validations) {
                console.log('...' + validation + ' validation:', Product.#validations[validation](product));
            };
        } catch (error) {
            console.error('At least one validation failed.');
            throw new Error(error);
        }
        console.log('All validations were fulfilled.');
    }

}

export default Product;
