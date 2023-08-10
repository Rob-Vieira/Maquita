/*
 * Maquita v1.0 (https://github.com/Rob-Vieira/maquita)
 * Robson Vieira (https://github.com/Rob-Vieira)
 * 
 * 2023-08-09 - Brasil
 * 
 * Aqui jaz Upfile.php, sempre em nossos corações.
 */
class Crop{
    /**
     * @param {Object} options 
     * @param {String} options.input 
     * @param {Number} options.width 
     * @param {Number} options.height 
     * @param {Function} options.imageBeforeLoad 
     * @param {Function} options.imageAfterLoad 
     * @param {Function} options.cropEnd
     * @param {Object} options.cropStyle
     * @param {String} options.cropStyle.class
     * @param {String} options.cropStyle.maxWidth
     * @param {String} options.cropStyle.position
     */
    constructor({ 
        input, 
        width = 300, 
        height = 300, 
        imageBeforeLoad = () => {}, 
        imageAfterLoad = () => {}, 
        cropEnd = () => {}, 
        cropStyle 
    }){
        this.input = document.getElementById(input);
        this.input.accept = 'image/*';

        this.width = width;
        this.height = height;
        this.imageBeforeLoad = imageBeforeLoad;
        this.imageAfterLoad = imageAfterLoad;
        this.cropEnd = cropEnd;
        this.aspectRatio = width / height;
        this.cropper = null;
        
        this.#imageContainer = {
            imageID: this.input.id + 'Image',
            containerStyle: {
                class: cropStyle.class ?? '',
                maxWidth: cropStyle.maxWidth ?? '500px',
                position: cropStyle.position ?? 'afterend'
            },
            input: this.input 
        }

        this.#setInputChange();
    }

    /**
     * @param {Object} options
     * @param {String} options.imageID
     * @param {Object} options.containerStyle
     * @param {String} options.containerStyle.class
     * @param {String} options.containerStyle.maxWidth
     * @param {String} options.containerStyle.position
     * @param {Element} options.input
     */
    set #imageContainer({ imageID, containerStyle, input }){
        this.continer = document.createElement('div');

        if(containerStyle.class == ''){
            this.continer.setAttribute('style', 'width: 100%;max-width: ' + containerStyle.maxWidth + ';overflow: hidden;')
        }
        else{
            this.continer.classList.add(containerStyle.class);
        }

        this.image = document.createElement('img');
        this.image.setAttribute('style', 'max-width: 100%;');
        this.image.id = imageID;

        this.continer.appendChild(this.image);
        input.insertAdjacentElement('afterend', this.continer);
    }

    #setInputChange(){
        this.input.addEventListener('change', (e) => {
            const file = e.target.files[0];
        
            if (file) {
                this.imageBeforeLoad();

                const reader = new FileReader();
                reader.onload = (event) => {
                    this.image.src = event.target.result;
        
                    if (this.cropper) {
                        this.cropper.destroy();
                    }
        
                    this.cropper = new Cropper(this.image, {
                        aspectRatio: this.width/this.height,
                        viewMode: 2,
                        cropend: () => { cropAndUpload(this.cropper, this.width, this.height, this.cropEnd) },
                        zoom: () => { cropAndUpload(this.cropper, this.width, this.height, this.cropEnd) },
                        ready: () => { cropAndUpload(this.cropper, this.width, this.height, this.cropEnd) },
                    });
        
                    this.imageAfterLoad();
        
                    /**
                     * @param {Cropper} cropper 
                     * @param {Number} width 
                     * @param {Number} height 
                     * @param {Function} cropEnd 
                     */
                    function cropAndUpload(cropper, width, height, cropEnd) {
                        const croppedCanvas = cropper.getCroppedCanvas({
                            width: width,
                            height: height,
                        });
        

                        let resizedCanvas = document.createElement('canvas');
                        resizedCanvas.width = width;
                        resizedCanvas.height = height;
                        
                        let ctx = resizedCanvas.getContext('2d');
                        ctx.drawImage(croppedCanvas, 0, 0, croppedCanvas.width, croppedCanvas.height, 0, 0, width, height);
                    
                        let jpegImage = resizedCanvas.toDataURL('image/jpeg', 0.8);
        
                        cropEnd(jpegImage);
                    }
                };
        
                reader.readAsDataURL(file);
            }
        });
    }
}

class Maquita{
    /**
     * @param {Object} options 
     * @param {String} options.target 
     * @param {String} options.form
     * @param {String} options.cropClass
     */
    constructor({ target, form, cropClass }){
        this.target = document.querySelectorAll(target);
        this.form = document.querySelector(form);
        this.crops = [];

        this.#createLoader();

        this.target.forEach((t, k) => {
            t.id = 'cropBag-' + k
            let inputHidden = document.createElement('input');
            inputHidden.id = t.dataset.name;
            inputHidden.name = t.dataset.name;
            inputHidden.type = 'hidden';
            this.form.appendChild(inputHidden);

            this.crops.push(new Crop({
                input: t.id,
                width: t.dataset.w,
                height: t.dataset.h,
                cropStyle: {
                    class: cropClass ?? ''
                },
                imageBeforeLoad: this.showLoader,
                imageAfterLoad: this.hideLoader,
                cropEnd: (image) => {
                    inputHidden.value = image;
                }
            }));
        })
    }

    #createLoader(){
        this.styleTag = document.createElement('style');
        this.styleTag.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .crop-bag-loader {
                border: 8px solid #f3f3f3;
                border-top: 8px solid #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 2s linear infinite;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .crop-bag-loader.hidden {
                display: none;
            }
        `;

        this.loader = document.createElement('div');
        this.loader.id = 'crop-bag-loader';
        this.loader.classList.add('crop-bag-loader');
        this.loader.classList.add('hidden');
        
        document.body.append(this.styleTag, this.loader)
    }


    showLoader() {
        document.getElementById('crop-bag-loader').classList.remove('hidden');
    }

    hideLoader() {
        document.getElementById('crop-bag-loader').classList.add('hidden');
    }
}