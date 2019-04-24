// herhnagi bir klasörü import ettiğinde o klasördeki index.js import edilir.
// /src/store/actions tan sonra /index yazmadan bu dosyayı import edebiliyoruz.

//bu dosya içinde de diğer actionlaradaki exportları kısaca hem import hem export etmiş oluyoruz.

export * from './sideActions';
export * from './user';
export * from './authActions';
export * from './signinActions';