import * as ActionTypes from '../action-types';
import * as OrderProcessHelper from '../../helpers/order-process/order-process-helper';
import orderProcessesMessages from '../../messages/order-processes.messages';

export const fetchOrderProcesses = (pagination) => (dispatch, getState) => {
  const { sortBy, orderProcesses } = getState().orderProcessReducer;

  let finalPagination = pagination;

  if (!pagination && orderProcesses) {
    const { limit, offset } = orderProcesses.meta;
    finalPagination = { limit, offset };
  }

  return dispatch({
    type: ActionTypes.FETCH_ORDER_PROCESSES,
    meta: {
      ...finalPagination,
      filter: pagination?.filterValue || '',
      storeState: true,
      stateKey: 'orderProcesses'
    },
    payload: OrderProcessHelper.listOrderProcesses(
      pagination?.filterValue,
      finalPagination,
      sortBy
    )
  });
};

export const fetchOrderProcess = (apiProps) => ({
  type: ActionTypes.FETCH_ORDER_PROCESS,
  payload: OrderProcessHelper.fetchOrderProcess(apiProps)
});

export const addOrderProcess = (processData, intl) => ({
  type: ActionTypes.ADD_ORDER_PROCESS,
  payload: OrderProcessHelper.addOrderProcess(processData),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: intl.formatMessage(
          orderProcessesMessages.addProcessSuccessTitle
        ),
        description: intl.formatMessage(
          orderProcessesMessages.addProcessSuccessDescription
        )
      }
    }
  }
});

export const updateOrderProcess = (processId, data, intl) => ({
  type: ActionTypes.UPDATE_ORDER_PROCESS,
  payload: OrderProcessHelper.updateOrderProcess(processId, data),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: intl.formatMessage(
          orderProcessesMessages.updateProcessSuccessTitle,
          { name: data.name }
        )
      }
    }
  }
});

export const sortOrderProcesses = (sortBy) => ({
  type: ActionTypes.SORT_ORDER_PROCESSES,
  payload: sortBy
});

export const setOrderProcess = (...args) => ({
  type: ActionTypes.SET_ORDER_PROCESS,
  payload: OrderProcessHelper.setOrderProcesses(...args)
});

export const removeOrderProcess = (orderProcess, intl) => ({
  type: ActionTypes.REMOVE_ORDER_PROCESS,
  payload: OrderProcessHelper.removeOrderProcess(orderProcess),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: intl.formatMessage(
          orderProcessesMessages.removeProcessSuccessTitle
        ),
        description: intl.formatMessage(
          orderProcessesMessages.removeProcessSuccessDescription
        )
      }
    }
  }
});

export const removeOrderProcesses = (orderProcesses, intl) => ({
  type: ActionTypes.REMOVE_ORDER_PROCESSES,
  payload: OrderProcessHelper.removeOrderProcesses(orderProcesses),
  meta: {
    notifications: {
      fulfilled: {
        variant: 'success',
        title: intl.formatMessage(
          orderProcessesMessages.removeProcessesSuccessTitle
        ),
        description: intl.formatMessage(
          orderProcessesMessages.removeProcessesSuccessDescription
        )
      }
    }
  }
});
