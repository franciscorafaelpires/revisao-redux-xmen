import fetchCharacters from '../../services/api';

export const charactersActions = () => ({
  type: 'REQUEST_CHARACTERS',
});

export const saveCharactersAction = (payload) => ({
  type: 'SAVE_CHARACTERS',
  payload,
});

export const failedRequestAction = (payload) => ({
  type: 'FAILED_REQUEST',
  payload,
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(charactersActions());
  try {
    const response = await fetchCharacters();
    if (!response) throw new Error('Algo de errado não está certo');
    dispatch(saveCharactersAction(response));
  } catch (error) {
    dispatch(failedRequestAction(error.message));
  }
};
