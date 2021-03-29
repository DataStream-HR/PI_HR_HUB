import {
  ADD_JOB_SUCCESS,
  ADD_JOB_LOADING,
  ADD_JOB_ERROR,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_LOADING,
  DELETE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_LOADING,
  EDIT_JOB_ERROR,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_LOADING,
  FETCH_JOB_ERROR,
} from "../actions/user/types";
import axios from "axios";
import { history } from "helpers/history";
var str = window.location.pathname;
let id = str.slice(12);

console.log(id);
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.id);
const GET_URL = "http://localhost:8080/job/jobs/605f25b1b98fa02b9875aaf8";
const ADD_URL = "http://localhost:8080/job/add/605f25b1b98fa02b9875aaf8";
const UPDATE_URL = "http://localhost:8080/job/job/" + id;
const DELETE_URL = "http://localhost:8080/job/deleteJob" + id;

//CREATE------------------------------------------------------------------------------------------------------------------------------------------------

export const createJobsSuccess = (data) => {
  window.location.reload(false);

  return {
    type: ADD_JOB_SUCCESS,
    payload: data,
  };
};
export const createJob = (job) => {
  if (job._id) {
    const data = {
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      requirement: job.requirement,
    };

    return (dispatch) => {
      dispatch(editJob(data));
    };
  } else {
    const data = {
      title: job.title,
      description: job.description,
      salary: job.salary,
      requirement: job.requirement,
    };

    return (dispatch) => {
      return axios
        .post(ADD_URL, data)
        .then((response) => {
          dispatch(createJobsSuccess(response.data));
        })

        .catch((error) => {
          console.log(error);
        })
        .catch((error) => {
          const errorPayload = {};
          errorPayload["message"] = error.response.data;
          errorPayload["status"] = error.response.status;
          dispatch(createJobError(errorPayload));
        });
    };
  }
};

export const createJobError = (data) => {
  return {
    type: ADD_JOB_ERROR,

    payload: data,
  };
};

//EDIT---------------------------------------------------------------------------------------------------------------------

export const editJobSuccess = (data) => {
  return {
    type: EDIT_JOB_SUCCESS,
    payload: data,
  };
};

export const editJobError = (data) => {
  return {
    type: EDIT_JOB_ERROR,
    payload: data,
  };
};
export const editJob = (data) => {
  const id = data.id;
  return (dispatch) => {
    return axios
      .put(UPDATE_URL, data)
      .then((response) => {
        dispatch(editJobSuccess(response.data));
        history.push("/admin/test");
      })

      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response.data;
        errorPayload["status"] = error.response.status;
        dispatch(editJobError(errorPayload));
      });
  };
};

//FETCh---------------------------------------------------------------------------------------------------
export const fetchjobsuccess = (data) => {
  console.log(data[0]);
  return {
    type: FETCH_JOB_SUCCESS,
    payload: data,
  };
};

export const fetchJobsLoading = (data) => {
  return {
    type: FETCH_JOB_LOADING,
    payload: data,
  };
};

export const fetchJobsError = (data) => {
  return {
    type: FETCH_JOB_ERROR,
    payload: data,
  };
};

const normalizeResponse = (data) => {
  const arr = data.map((item) => {
    arr.forEach((k) => {
      console.log(arr);
    });
    return arr;
  });
  return arr;
};

export const fetchJobs = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchJobsLoading(isLoading));
    return axios
      .get(GET_URL)
      .then((response) => {
        const data = response.data.jobs;

        dispatch(fetchjobsuccess(data));
        isLoading = false;
        dispatch(fetchJobsLoading(isLoading));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response.data.message;
        errorPayload["status"] = error.response.status;
        dispatch(fetchJobsError(errorPayload));
        isLoading = false;
        dispatch(fetchJobsLoading(isLoading));
      });
  };
};

//DELETE------------------------------------------------------------------------------------------------------------------------------------

export const deleteJobSuccess = (id) => {
  return {
    type: DELETE_JOB_SUCCESS,
    payload: {
      id: id,
    },
  };
};

export const deleteJobError = (data) => {
  return {
    type: DELETE_JOB_ERROR,
    payload: data,
  };
};
export const deleteJob = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${DELETE_URL}/${id}`)
      .then(() => {
        dispatch(deleteJobSuccess(id));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response.data.message;
        errorPayload["status"] = error.response.status;
        dispatch(deleteJobError(errorPayload));
      });
  };
};
