import Announcement from './Announcement'
import styled from 'styled-components'
import { BiSearchAlt2, BiCart } from 'react-icons/bi'
import { mobile } from '../responsive/responsive'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/userSlice'


const Container = styled.div`
  height: 60px;

  ${mobile({
  height: '50px',
})}
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({
  padding: '10px 0',
})}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

  ${mobile({
  display: 'none',
})}
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`
const Input = styled.input`
  border: none;

  ${mobile({
  width: '50px',
})}
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;

  ${mobile({
  fontSize: '24px',
})}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({
  justifyContent: 'center',
  flex: '2',
})}
`
const MenuItem = styled.div`
  display: block;
  position: relative;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({
  fontSize: '12px',
  marginLeft: '10px',
})}
`
const AmountContainer = styled.div`
  position: absolute;
  top: -.5rem;
  right: -.75rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #414BB8;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TotalAmount = styled.p`
  color: #fff;
  margin-bottom: 0;
  font-size: 1rem;
`


const Navbar = () => {
  const { amount } = useSelector(store => store.cart)
  const user = useSelector(store => store.user.currentUser)

  const dispatch = useDispatch()


  return (
    <>
      <Announcement />
      <Container>
        <Wrapper>
          <Left>
            <Language>🇬🇧</Language>
            <span>&nbsp;|&nbsp;</span>
            <Language>🇮🇹</Language>
            <span>&nbsp;|&nbsp;</span>
            <Language>🇪🇸</Language>
            <SearchContainer>
              <Input placeholder='search' />
              <BiSearchAlt2 style={{ color: 'gray', fontSize: '1rem' }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to='/'>
              <Logo>Cocci E-Shop</Logo>
            </Link>
          </Center>
          <Right>
            {
              user ? (
                <>
                  <MenuItem>HELLO, {user.other.username.toUpperCase()}!</MenuItem>
                  <MenuItem onClick={() => dispatch(logout())}>LOGOUT</MenuItem>
                </>
              ) : (
                <>
                  <Link to='/register'>
                    <MenuItem>REGISTER</MenuItem>
                  </Link>
                  <Link to='/login'>
                    <MenuItem>LOGIN</MenuItem>
                  </Link>
                </>
              )
            }
            <Link to='/cart'>
              <MenuItem>
                <BiCart style={{ fontSize: '2rem' }} />
                {
                  amount > 0 &&
                  <AmountContainer>
                    <TotalAmount>
                      {amount}
                    </TotalAmount>
                  </AmountContainer>
                }
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </>
  )
}

export default Navbar