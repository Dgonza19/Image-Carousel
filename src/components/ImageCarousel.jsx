import React, { useState, useEffect } from 'react';

function ImageCarousel() {

    const imagenes = [
        { src: 'image1.jpg' },
        { src: 'image2.jpg' },
        { src: 'image3.jpg' },
        { src: 'image4.jpg' }

    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
            }, 4000);

            return () => clearInterval(timer);
        }
    }, [isPaused, imagenes.length]);

    useEffect(() => {
        if (currentIndex >= imagenes.length) {
            setCurrentIndex(0);
        }
    }, [imagenes]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1));
    }

    return (
        <div className='carousel'>
            {imagenes.length > 0 ? (
                <div>
                    <div className='carousel-image-container'>
                        <img
                            className='carousel-image'
                            src={imagenes[currentIndex].src}
                            alt={`Imagen ${currentIndex + 1}`}
                        />
                    </div>
                    <div className='button-container'>
                        <button onClick={handlePrev} className='carousel-handle-button'>Anterior</button>
                        <button onClick={() => setIsPaused(true)} className='carousel-paused-button'>Pausar</button>
                        <button onClick={() => setIsPaused(false)} className='carousel-paused-button'>Reanudar</button>
                        <button onClick={handleNext} className='carousel-handle-button'>Siguiente</button>
                    </div>
                </div>
            ) : (
                <p>No hay imagenes disponibles</p>
            )}
        </div>
    );
}


export default ImageCarousel;