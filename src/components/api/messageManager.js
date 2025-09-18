import { postApi, sendContactMessageApi } from "./apiManager"

export const sendMessage = async(toast, request) => {
  try {
    await postApi(`next-activos/createRequest`, request)
    toast.showToast({
      type: 'info',
      title: 'Notification Send',
      message: 'We have received your request, we will contact you soon.'
    })
  } catch (error) {
    toast.showToast({
      type: 'error',
      title: 'Error',
      message: "We can't send your request. Please try again later."
    })
    console.log(error);
  }
} 

export const sendContactMessage = async( request) => {
  try {
    await sendContactMessageApi(`next-activos/sendContactRequest`, request)
    return 'Hemos recibido tu solicitud. Te contactaremos pronto.';
    /* toast.showToast({
      type: 'info',
      title: 'Notification Send',
      message: 'We have received your request, we will contact you soon.'
    }) */
  } catch (error) {
    /* toast.showToast({
      type: 'error',
      title: 'Error',
      message: "We can't send your request. Please try again later."
    }) */
    console.log(error);
    return "No fue posible enviar tu contacto. Intenta de nuevo más tarde.";
  }
} 