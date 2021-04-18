import React, { Component } from "react";
import { createJob } from "Redux/actions/job.actions";
import { connect } from "react-redux";
class CardAddJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: 0,
      title: "",
      description: "",
      salary: 0,
      requirement: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state);
    window.location.reload(false);
  }

  handlOnValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({
      title: "",
      description: "",
      salary: 0,
      requirement: "",
    });
  }
  componentWillMount() {
    const props = this.props;

    if (props.location && props.location.state) {
      const job = props.location.state.job;
      this.setState({
        _id: job._id,
        title: job.title,
        description: job.description,
        salary: job.salary,
        requirement: job.requirement,
      });
    }
  }

  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">Add new job</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Add
              </button>

              <button
                className="bg-teal-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={this.handleReset.bind(this)}
              >
                REset
              </button>
              <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                Job Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="name this job"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.title}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <input
                      name="description"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Describe your job"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.description}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Salary
                    </label>
                    <input
                      name="salary"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="$"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.salary}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Requirement
                    </label>
                    <input
                      name="requirement"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Exemple(Angular , React ....)"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.requirement}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.jobData.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (job) => {
      dispatch(createJob(job));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardAddJob);
