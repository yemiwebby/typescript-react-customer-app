import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    customer: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends React.Component<{} & RouteComponentProps<any>, IFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers/${this.state.id}`).then(data => {
            this.setState({ customer: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/customers/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.customer &&
                    <div>
                        < h1 > Customer List Management App</h1>
                        <p> Built with React.js and TypeScript </p>


                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Customer </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Customer's details has been edited successfully </div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="first_name"> First Name </label>
                                        <input type="text" id="first_name" defaultValue={this.state.customer.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter customer's first name" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="last_name"> Last Name </label>
                                        <input type="text" id="last_name" defaultValue={this.state.customer.last_name} onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter customer's last name" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"> Email </label>
                                        <input type="email" id="email" defaultValue={this.state.customer.email} onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter customer's email address" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="phone"> Phone </label>
                                        <input type="text" id="phone" defaultValue={this.state.customer.phone} onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter customer's phone number" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="address"> Address </label>
                                        <input type="text" id="address" defaultValue={this.state.customer.address} onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter customer's address" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="description"> Description </label>
                                        <input type="text" id="description" defaultValue={this.state.customer.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Customer </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditCustomer)
