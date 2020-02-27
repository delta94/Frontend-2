import { isPromise, translate } from 'react-jhipster';
import { toast } from 'react-toastify';

const addErrorAlert = (message, key?, data?) => {
  key = key ? key : message;
  toast.error(translate(key, data));
};
export default () => next => action => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then(response => {
      if (action.meta && action.meta.successMessage) {
        toast.success(action.meta.successMessage);
      } else if (response && response.action && response.action.payload && response.action.payload.headers) {
        const headers = response.action.payload.headers;
        let alert: string = null;
        let alertParams: string = null;
        Object.entries(headers).forEach(([k, v]: [string, string]) => {
          if (k.toLowerCase().endsWith('app-alert')) {
            alert = v;
          } else if (k.toLowerCase().endsWith('app-params')) {
            alertParams = v;
          }
        });
        if (alert) {
          const alertParam = alertParams;
          toast.success(translate(alert, { param: alertParam }));
        }
      }
      return Promise.resolve(response);
    })
    .catch(error => {
      if (action.meta && action.meta.errorMessage) {
        toast.error(action.meta.errorMessage);
      } else if (error && error.response) {
        const response = error.response;
        const data = response.data;
        const details = data.detailErrors ? data.detailErrors[0].errorMessage : '';
        if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
          let i;
          switch (response.status) {
            // connection refused, server not reachable
            case 0:
              addErrorAlert('Server not reachable', 'error.server.not.reachable');
              break;

            case 400:
              const headers = Object.entries(response.headers);
              let errorHeader = null;
              let entityKey = null;
              headers.forEach(([k, v]: [string, string]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v;
                }
              });
              if (errorHeader) {
                const entityName = translate('global.menu.entities.' + entityKey);
                addErrorAlert(errorHeader, errorHeader, { entityName });
              } else if (data !== '' && data.fieldErrors) {
                const fieldErrors = data.fieldErrors;
                for (i = 0; i < fieldErrors.length; i++) {
                  const fieldError = fieldErrors[i];
                  if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                    fieldError.message = 'Size';
                  }
                  // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                  const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                  const fieldName = translate(`izziPlatform.${fieldError.objectName}.${convertedField}`);
                  addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`, { fieldName });
                }
              } else if (data !== '' && data.errorMessage && data.errorCode) {
                // toast.error(data.errorMessage);
                // addErrorAlert(data.errorMessage, `error.response.${data.errorCode}`);
              } else {
                addErrorAlert(details ? details : data.message);
                toast.error(details ? details : data.message, { autoClose: false });
              }
              break;

            case 401:
              // addErrorAlert('Unauthorized', 'error.unauthorized');
              break;

            case 404:
              if (data !== '' && data.errorMessage && data.errorCode) {
                addErrorAlert(data.errorMessage, `error.response.${data.errorCode}`);
              } else {
                // addErrorAlert('Not found', 'error.url-not-found');
              }
              break;

            default:
              if (data !== '' && data.errorCode) {
                // addErrorAlert(`error.response.${data.errorCode}`);
              } else {
                addErrorAlert(data);
              }
          }
        }
      } else if (error && error.errorCode) {
        // addErrorAlert(`error.response.${error.errorCode}`);
      } else {
        toast.error('Hệ thống đang nâng cấp. Vui lòng thử lại sau!');
      }
      return Promise.reject(error);
    });
};
