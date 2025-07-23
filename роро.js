function Canvas({ sizeref }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null); // единственнаяцель - сохранить ссылку
  // на вызов ниже в риквест фрейм что бы отключить при размонтировании

  let contextRef = useRef(null);
  let imageRef = useRef(null);

  const imgStuffRef = useRef({
    newWidth: null,
    newHeight: null,
    offsetX: null,
    offsetY: null,
    index: null,
  });

  const canvasStuffRef = useRef({
    width: null,
    height: null,
    bgPositionY: null,
  });

  let songRef = useRef(null);
  let playStatusRef = useRef(false);

  let time;
  // x

  function setImage() {
    // вызывается с локальными переменными
    setImageSize(imageRef, canvasStuffRef, imgStuffRef);
    drawImage(imageRef, contextRef, canvasStuffRef, imgStuffRef);
  }

  useEffect(() => {
    // при новом рендере вызывается функция очистки

    if (!canvasRef.current || !sizeref.current) return;

    contextRef.current = canvasRef.current.getContext("2d");

    console.log(sizeref.current);

    setCanvasSize(sizeref.current, canvasRef.current, canvasStuffRef, 20);

    imageRef.current = new Image();

    imageRef.current.src = img;
    console.log(imageRef.current);

    imageRef.current.onload = () => {
      setImage();
      animate();
    };

    if (imageRef.current.complete) {
      setImage();
      animate();
    }

    imageRef.current.onerror = () => {
      console.error("Ошибка загрузки изображения");
      // Можно отобразить fallback, показать сообщение или остановить анимацию
    };

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize(sizeref.current, canvasRef.current, canvasStuffRef, 20);
      setImage();
    });

    resizeObserver.observe(sizeref.current);

    time = 0;

    // анимейт и обзервер между ренедрами не получат новые значения будут
    // работать с замкнутыми перменными
    // а переменные в случае рендера не обновятся потмоу что обновляются
    // в эффект котоырй не запустится без изменения зависисотей

    function animate() {
      // вызывется с локальными переменными из этого
      // блока поэтому аргументы не нужны

      let { width, height, bgPositionY } = canvasStuffRef.current;
      let { newWidth, newHeight, offsetX, offsetY, index } =
        imgStuffRef.current;
      let context = contextRef.current;
      let image = imageRef.current;

      const vawe = 5;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        0 - offsetX,
        0 - offsetY + bgPositionY,
        newWidth,
        newHeight
      );

      for (let y = newHeight / 4; y <= newHeight; y += vawe) {
        let sin = Math.sin(3.14 / (100 / y) + time);

        context.drawImage(
          image, // картинка
          // масштабировать можно в любой паре координат
          // в зависимости от цели
          0, // нольпотому вся каринка
          y / index, // увеливаем исходную область что бы шаг был такой чтобы
          // полностью пройти картинку по выосте оригинальной
          image.width / 2,
          vawe / index, // тоже самое что и игрик только с размеров волны
          // умножаем на индекс а ширины нет потому что они не масштабированы
          // масштабируем на лету координаты и переводим высоту
          // волны в размерность картинки

          0 - offsetX + sin,
          y - offsetY + bgPositionY,
          newWidth / 2,
          vawe
          //тут все просто ресайза и масштабирования нет
          // просто куда и как вставть на канвас и в каком размере
          // картинку или ее часть
        );
      }

      // context.drawImage(image,

      //   0,
      //   image.height * 0.6,
      //   image.width / 2,
      //   image.height * 0.4,

      //   0 - offsetX,
      //   newHeight * 0.6 - offsetY + bgPositionY,
      //   newWidth / 2,
      //   newHeight * 0.4
      // )

      time += 0.05;

      animationRef.current = requestAnimationFrame(animate); // получаем
      // ссылку на анимацю чтобы в случае перезапуска компонента
      // оставноиться текущую анимацию и начать новую
      // дабы избежать наложения анимация
    }

    return () => {
      resizeObserver.disconnect();
      imageRef.current.onload = null; // обнуляем обработчики и верхний
      imageRef.current.onerror = null;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current); // прерываем аницию
      }
    };

    // end of useEffect
  }, []);

  return (
    <>
      <canvas
        onClick={() => playSong(playStatusRef, songRef)}
        ref={canvasRef}
        className="canvas"
      ></canvas>
      <audio ref={songRef} src={johnAudio}></audio>
    </>
  );
}

// --------------------- // ---------------------
function Canvas({ containerref }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null); // единственнаяцель - сохранить ссылку
  // на вызов ниже в риквест фрейм что бы отключить при размонтировании

  let canvas, context, image;

  const imgStuff = {
    newWidth: null,
    newHeight: null,
    offsetX: null,
    offsetY: null,
    index: null,
  };
  const canvasStuff = {
    width: null,
    height: null,
    bgPositionY: null,
  };

  let parentel;

  let songRef = useRef(null);
  let playStatusRef = useRef(false);

  let time;
  // x

  function setImage() {
    setImageSize(image, canvasStuff, imgStuff);
    drawImage(image, context, canvasStuff, imgStuff);
  }

  useEffect(() => {
    // при новом рендере вызывается функция очистки

    canvas = canvasRef.current;
    context = canvas.getContext("2d");

    parentel = containerref.current;

    if (!canvas || !parentel || !context) return;

    console.log(parentel);

    setCanvasSize(parentel, canvas, canvasStuff, 20);

    image = new Image();

    image.src = img;
    console.log(image);

    image.onload = () => {
      setImage();
      animate();
    };

    if (image.complete) {
      setImage();
      animate();
    }

    image.onerror = () => {
      console.error("Ошибка загрузки изображения");
      // Можно отобразить fallback, показать сообщение или остановить анимацию
    };

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize(parentel, canvas, canvasStuff, 20);
      setImage();
    });

    resizeObserver.observe(parentel);

    time = 0;

    // анимейт и обзервер между ренедрами не получат новые значения будут
    // работать с замкнутыми перменными
    // а переменные в случае рендера не обновятся потмоу что обновляются
    // в эффект котоырй не запустится без изменения зависисотей

    function animate() {
      // вызывется с локальными переменными из этого
      // блока поэтому аргументы не нужны

      let { width, height, bgPositionY } = canvasStuff;
      let { newWidth, newHeight, offsetX, offsetY, index } = imgStuff;

      const vawe = 5;
      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        0 - offsetX,
        0 - offsetY + bgPositionY,
        newWidth,
        newHeight
      );

      for (let y = newHeight / 4; y <= newHeight; y += vawe) {
        let sin = Math.sin(3.14 / (100 / y) + time);

        context.drawImage(
          image, // картинка
          // масштабировать можно в любой паре координат
          // в зависимости от цели
          0, // нольпотому вся каринка
          y / index, // увеливаем исходную область что бы шаг был такой чтобы
          // полностью пройти картинку по выосте оригинальной
          image.width / 2,
          vawe / index, // тоже самое что и игрик только с размеров волны
          // умножаем на индекс а ширины нет потому что они не масштабированы
          // масштабируем на лету координаты и переводим высоту
          // волны в размерность картинки

          0 - offsetX + sin,
          y - offsetY + bgPositionY,
          newWidth / 2,
          vawe
          //тут все просто ресайза и масштабирования нет
          // просто куда и как вставть на канвас и в каком размере
          // картинку или ее часть
        );
      }

      context.drawImage(
        image,

        0,
        image.height * 0.6,
        image.width / 2,
        image.height * 0.4,

        0 - offsetX,
        newHeight * 0.6 - offsetY + bgPositionY,
        newWidth / 2,
        newHeight * 0.4
      );

      time += 0.05;

      animationRef.current = requestAnimationFrame(animate); // получаем
      // ссылку на анимацю чтобы в случае перезапуска компонента
      // оставноиться текущую анимацию и начать новую
      // дабы избежать наложения анимация
    }

    return () => {
      resizeObserver.disconnect();
      image.onload = null; // обнуляем обработчики и верхний
      image.onerror = null;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current); // прерываем аницию
      }
    };

    // end of useEffect
  }, [containerref]);

  return (
    <>
      <canvas
        onClick={() => playSong(playStatusRef, songRef)}
        ref={canvasRef}
        className="canvas"
      ></canvas>
      <audio ref={songRef} src={johnAudio}></audio>
    </>
  );
}
