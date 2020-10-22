import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useForm } from '../utilities/hooks'
import { AuthContext } from '../context/auth'

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData }}){
            context.login(userData) // does the same thing, don't need 2 fns
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser(){
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                {/* because html by default tries to validate fields */}
                <h1>Register</h1>
                <Form.Input label="Username" placeholder="Username..." name="username" type="text" value={values.username} error={errors.username ? true : false } onChange={onChange}/>
                <Form.Input label="Email" placeholder="Email..." name="email" type="email" value={values.email} error={errors.email ? true : false } onChange={onChange}/>
                <Form.Input label="Password" placeholder="Password..." name="password" type="password" value={values.password} error={errors.password ? true : false } onChange={onChange}/>
                <Form.Input label="Confirm password" placeholder="Confirm password.." name="confirmPassword" type="password" value={values.confirmPassword} error={errors.confirmPassword ? true : false } onChange={onChange}/>
                <Button type="submit" color='teal'>
                    Register 
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

// errors length > 0 bc empty object at the start, so there'll always be errors

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;