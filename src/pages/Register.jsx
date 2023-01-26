import styled from 'styled-components'
import { mobile } from '../responsive/responsive'


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
        linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), 
        url('https://images.unsplash.com/photo-1560841650-fa45ffd48b77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') no-repeat center / cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;

    ${mobile({
        width: '75%',
    })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`
const Agreement = styled.span`
    font-style: 12px;
    margin: 20px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const Register = () => {

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder='first name' />
                    <Input placeholder='last name' />
                    <Input placeholder='email' />
                    <Input placeholder='username' />
                    <Input placeholder='password' />
                    <Input placeholder='confirm password' />
                    <Agreement>
                        By creating an account, I consent to the processing
                        of my personal data in accordance with the <b>Privacy Policy</b>
                    </Agreement>
                    <Button>Create Account</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register