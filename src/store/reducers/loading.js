// loading reducer ile sunucudan veri çekim adımlarını takip ediyoruz.
//herhangi bir "_REQUEST" ile biten type varsa onunla ilgili loading = TRUE olur, diğer her iki durumda da false olur

const loadingReducer= (state = {}, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
    if (!matches) return state;  
    const [, requestName, requestState] = matches;
    return {
      ...state,
      [requestName]: requestState === 'REQUEST',
    };
  };

  export default loadingReducer;