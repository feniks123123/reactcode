import fetchMortgageFiltered from './fetchMortgageFiltered';
import fetchSmsRequest from './fetchSmsRequest';
import fetchMortgageBlocksById from './fetchMortgageBlocksById';
import fetchMortgageSubsidies from './fetchMortgageSubsidies';
import fetchMortgagePartners from './fetchMortgagePartners';
import sendUserData from './sendUserData';
import getInitValues from './utils/getInitValues';
import isMobile from '../../../common/utils/isMobile';
import calculateMortgageSum from './utils/calculateMortgageSum';
import filteringMortgage from './utils/filteringMortgage';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import {
  ACTION_UPDATE_MORTGAGE_COUNT,
  ACTION_MORTGAGE_STEP,
  ACTION_MORTGAGE_ADD_USER_DATA,
  ACTION_MORTGAGE_SMS_REQUEST,
  ACTION_MORTGAGE_ERROR,
  ACTION_MORTGAGE_AUTH_KEY,
  ACTION_GET_PARTNERS,
  ACTION_MORTGAGE_INIT,
  ACTION_LENDING_OPTIONS,
  ACTION_FILTER_PROGRAMS,
  ACTION_GET_BLOCKS,
  ACTION_CLEAR_MORTGAGE_DATA,
  ACTION_GET_SUBSIDIES
} from '../constants';

function actionUpdateMortgageCount(mortgageCount) {
  return {
    type: ACTION_UPDATE_MORTGAGE_COUNT,
    mortgageCount
  };
}

export function actionMortgageAddUserData(user) {
  return {
    type: ACTION_MORTGAGE_ADD_USER_DATA,
    user
  };
}


export function actionMortgageStep(step) {
  return {
    type: ACTION_MORTGAGE_STEP,
    step
  };
}

export function actionMortgageSmsRequest(message) {
  return {
    type: ACTION_MORTGAGE_SMS_REQUEST,
    message
  };
}


export function actionMortgageError(error) {
  return {
    type: ACTION_MORTGAGE_ERROR,
    error
  };
}

export function actionMortgageAuthKey(key) {
  return {
    type: ACTION_MORTGAGE_AUTH_KEY,
    key
  };
}

export function actionGetPartners(partners) {
  return {
    type: ACTION_GET_PARTNERS,
    partners
  };
}


export function actionMortgageInit(mortgageInitValue) {
  return {
    type: ACTION_MORTGAGE_INIT,
    mortgageInitValue
  };
}

export function actionLendingOptions(lendingOptions) {
  return {
    type: ACTION_LENDING_OPTIONS,
    lendingOptions
  };
}

export function actionFilterPrograms(filteredPrograms) {
  return {
    type: ACTION_FILTER_PROGRAMS,
    filteredPrograms,
  };
}

export function actionGetSubsidies(subsidies) {
  return {
    type: ACTION_GET_SUBSIDIES,
    subsidies,
  };
}

export function actionGetBlocks(blocks) {
  return {
    type: ACTION_GET_BLOCKS,
    blocks,
  };
}

export function actionClearMortgageData() {
  return {
    type: ACTION_CLEAR_MORTGAGE_DATA
  };
}

export const getBlocks = guid => (dispatch, getState) => {
  const { geo: { currentLocation: { locations } } } = getState();
  fetchMortgageBlocksById(guid, locations)
    .then(blocks => dispatch(actionGetBlocks(blocks)))
    .catch(err => console.log(err));
};

export const getSubsidies = () => (dispatch, getState) => {
  const { geo: { currentLocation: { locations } } } = getState();
  fetchMortgageSubsidies(locations)
    .then(subsidies => dispatch(actionGetSubsidies(subsidies)))
    .catch(err => console.log(err));
};

export const sendSmsRequest = () => (dispatch, getState) => {
  const { mortgage: { user: { phone } } } = getState();
  const requestData = {
    phone
  };

  fetchSmsRequest(requestData)
    .then(resp => {
      dispatch(actionMortgageSmsRequest(resp.message));
    })
    .catch(err => {
      dispatch(actionMortgageError(true));
      console.log(err);
    });
};

export const sendCodeApprove = (code) => (dispatch, getState) => {
  const { mortgage: { user } } = getState();
  const requestData = {
    phone: user.phone,
    code
  };

  fetchSmsRequest(requestData)
    .then(({ auth_key }) => {
      sendUserData({
        ...user,
        auth_key,
        source: 4,
        mobile: isMobile() ? 1 : 0,
      })
        .then(({ token }) => {
          if (window.directCrm) {
            window.directCrm('identify', {
              operation    : 'IpotekaZayavkaPoslePodtverzhdenia',
              identificator: {
                provider: 'email',
                identity: user.email
              },
              data: {
                fullName   : user.full_name,
                mobilePhone: user.phone,
                birthDate  : user.birthday,
              }
            });
          }

          document.location.assign(`https://client.pik.ru/mortgage/params?token=${ token }`);
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      switch (err.data.error) {
        case 'ERR_WRONG_CODE':
          dispatch(actionMortgageSmsRequest('Неверный код'));
          dispatch(actionMortgageError('Неверный код'));
          break;
        case 'ERR_SMS_CODE_EXPIRED':
          dispatch(actionMortgageSmsRequest('Срок действия кода истек'));
          dispatch(actionMortgageError('Срок действия кода истек'));
          break;
        case 'ERR_CODE_NOT_EXPIRED':
          dispatch(actionMortgageSmsRequest('Предыдущий код еще не истек'));
          dispatch(actionMortgageError('Предыдущий код еще не истек'));
          break;
      }

      console.log(err);
    });
};

export const updateMortgageCount = params => (dispatch) => {
  fetchMortgageFiltered(params)
    .then(mortgages => dispatch(actionUpdateMortgageCount(mortgages.length)))
    .catch(err => dispatch(actionUpdateMortgageCount(null)));
};

export const getMortgageLoading = (push, initFilter = null) => (dispatch, getState) => {
  const { geo: { currentLocation: { locations, url } } } = getState();
  let link = '/mortgage/about';

  if(initFilter) {
    link = `${ link }#ApplicationMortgage`;
    dispatch(actionLendingOptions(initFilter));
  }

  dispatch(showLoading());
  Promise.all([
    fetchMortgagePartners(locations),
    fetchMortgageSubsidies(locations)
  ])
    .then(([ partners, subsidies ]) => {
      dispatch(actionGetPartners(partners));
      dispatch(actionGetSubsidies(subsidies));
      push(`${ url }${ link }`);
      dispatch(hideLoading());
    })
    .catch(err => dispatch(hideLoading()));

};

export const initMortgageData = () => (dispatch, getState) => {
  const {
    mortgage: {
      partners: { programs },
      lendingOptions
    },
    geo: { currentLocation: { locations } }
  } = getState();

  if (!programs) {
    return Promise.all([
      fetchMortgagePartners(locations),
      fetchMortgageSubsidies(locations)
    ])
      .then(([ partners, subsidies ]) => {
        dispatch(actionGetPartners(partners));
        const initValues = getInitValues(partners.programs);
        const filteredPrograms = filteringMortgage(partners.programs, lendingOptions);

        dispatch(actionGetSubsidies(subsidies));
        dispatch(actionMortgageInit(initValues));
        dispatch(actionFilterPrograms(filteredPrograms));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const initValues = getInitValues(programs);
  const filteredPrograms = filteringMortgage(programs, lendingOptions);

  dispatch(actionMortgageInit(initValues));
  dispatch(actionFilterPrograms(filteredPrograms));
};

export const updateLendingOptions = value => (dispatch, getState) => {
  const { mortgage: { lendingOptions, mortgageInitValue, partners } } = getState();

  if (value.currencyPercent !== undefined) {
    lendingOptions.currency = value.currencyPercent * lendingOptions.cost / 100;
  }

  if (value.currency !== undefined) {
    lendingOptions.currencyPercent = Math.round(value.currency * 100 / lendingOptions.cost);
  }

  const newLendingOptions = {
    ...lendingOptions,
    ...value,
    ...calculateMortgageSum({ ...lendingOptions, ...value }, mortgageInitValue)
  };

  const filteredPrograms = filteringMortgage(partners.programs, newLendingOptions);

  dispatch(actionLendingOptions(newLendingOptions));
  dispatch(actionFilterPrograms(filteredPrograms));
};