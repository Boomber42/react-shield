import 'react-image-crop/dist/ReactCrop.css'
import { Dispatch, useRef, useState } from "react";
import ReactCrop, { makeAspectCrop, type Crop, centerCrop, convertToPixelCrop } from "react-image-crop";
import { setCanvasPreview } from '../helpers/setCanvasPreview';

interface ImageCropperProps {
    setCropStatus: Dispatch<boolean>,
    closeImageModal: Dispatch<any>,
}

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 500;

export default function ImageCropper({ setCropStatus, closeImageModal }: ImageCropperProps) {
    const fileInputRef = useRef(null);
    const imgRef = useRef<any>(null);
    const previewsCanvasRef = useRef<any>(null);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [err, setErr] = useState('');

    const onSelectFile = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || '';
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e: any) => {
                if (err) setErr("");

                const { naturalWidth, naturalHeight } = e.currentTarget;

                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setErr(`A imagem deve ter ao menos ${MIN_DIMENSION} por ${MIN_DIMENSION} pixels`);
                    setCropStatus(false);
                    return setImgSrc("");
                }
            })

            setCropStatus(true);
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    }

    const onImageLoad = (e: any) => {
        const { width, height } = e.currentTarget;

        const crop = makeAspectCrop({
            unit: 'px',
            width: MIN_DIMENSION / 2,
        }, ASPECT_RATIO, width, height);

        const centeredCrop = centerCrop(crop, width, height);

        setCrop(centeredCrop);
    }

    const onChangeCrop = (crop: any, percentCrop: any) => {
        setCrop(percentCrop);
    }

    const oncloseModal = () => {
        setCanvasPreview(
            imgRef.current,
            previewsCanvasRef.current,
            convertToPixelCrop(
                crop as Crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );

        const dataUrl: string = previewsCanvasRef.current.toDataURL();

        setImgSrc('');
        setCrop(undefined);
        setErr('');
        imgRef.current = null;
        previewsCanvasRef.current = null;
        fileInputRef.current = null;

        closeImageModal(dataUrl);
    }

    return (
        <>
            <label>
                <span>Escolha uma imagem</span>
                <input id="file" type="file" accept="image/*" onChange={onSelectFile} />
            </label>
            {err && <p>{err}</p>}
            {imgSrc && (
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <ReactCrop
                        onChange={onChangeCrop}
                        crop={crop}
                        keepSelection
                        aspect={ASPECT_RATIO}
                        maxWidth={MIN_DIMENSION / 2}
                        maxHeight={MIN_DIMENSION / 2}
                        minWidth={MIN_DIMENSION / 2}
                        minHeight={MIN_DIMENSION / 2}
                        locked
                    >
                        <div style={{
                            position: "relative"
                        }}>
                            <img ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} style={{
                                maxHeight: "500px",
                                maxWidth: "500px",
                                textAlign: "center"
                            }} />
                        </div>
                    </ReactCrop>

                    {crop && (
                        <canvas
                            ref={previewsCanvasRef}
                            style={{
                                display: 'none',
                                border: "1px solid black",
                                objectFit: 'contain',
                                width: '150px',
                                height: '150px'
                            }}
                        ></canvas>
                    )}
                    
                    <button
                        style={{
                            position: "absolute",
                            bottom: "11px",
                            right: "2px",
                            borderRadius: "50px",
                            width: "120px",
                            height: "39px"
                        }}
                        onClick={oncloseModal}
                    >Cortar image</button>
                </div>
            )}
        </>
    )
}