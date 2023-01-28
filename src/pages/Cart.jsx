import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { mobile } from '../responsive/responsive'
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, clearCart, toggleCartAmount, getCartTotal } from '../redux/features/cartSlice'


const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY


const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;

    ${mobile({
    padding: '10px',
})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type == 'filled' && 'none'};
    background-color: ${props => props.type == 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type == 'filled' && 'white'};
`
const TopTexts = styled.div`
    ${mobile({
    display: 'none',
})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({
    flexDirection: 'column',
})}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({
    flexDirection: 'column',
})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
`
const ProductID = styled.span`
`
const ProductColor = styled.div`
margin-left: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`
    display: flex;
`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ProductAMountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ToggleIcon = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;

    &:disabled{
        cursor: not-allowed;
    }
`
const ProductAmount = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;  
    align-items: center;
    justify-content: center;
    margin: 0 5px;

    ${mobile({
    margin: '5px 15px',
})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;

    ${mobile({
    marginBottom: '20px',
})}
`
const RemoveProduct = styled.p`
    margin-top: 20px;
    font-size: 16px;
    text-decoration: underline;
    font-weight: 400;
    cursor: pointer;
`
const Summary = styled.div`
    flex: 1;
    border: .5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'};
    font-size: ${props => props.type === 'total' && '20px'};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;

    &:disabled {
        background-color: lightgrey;
        color: red;
    }
`
const ClearCart = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 16px;
    text-decoration: underline;
    font-weight: 400;
    cursor: pointer;
`


const Cart = () => {
    const cart = useSelector(store => store.cart)
    const user = useSelector((store) => store.user.currentUser);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        dispatch(getCartTotal())
    }, [cart.products])

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post(
                    'http://localhost:4000/api/checkout/payment',
                    {
                        tokenId: stripeToken.id,
                        amount: cart.total * 100
                    }
                )
                const navigateState = {
                    stripeData: res.data,
                    orderData: cart
                }
                navigate('/payment/checkout', { state: navigateState } )
            } catch (err) {
                console.error(err)
                navigate('/payment/checkout', { state: err } )
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart.total])


    if (cart.products.length === 0) {
        return (
            <Container>
                <Wrapper>
                    <Top>
                        <Link to='/products'>
                            <TopButton>CONTINUE SHOPPING</TopButton>
                        </Link>
                        <TopTexts>
                            <TopText>Wishlist</TopText>
                        </TopTexts>
                    </Top>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '70px 0' }}>
                        Your cart is empty
                    </h2>
                </Wrapper>
            </Container>

        )
    }

    return (
        <Container>
            <Wrapper>
                <Title>WELCOME BACK</Title>
                <Top>
                    <Link to='/products'>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Wishlist</TopText>
                    </TopTexts>
                </Top>
                <Bottom>
                    <Info>
                        {
                            cart.products.map(product => {
                                const { img, title, _id, color, size, quantity, price } = product
                                return (
                                    <Product key={`${_id}&${color}&${size}`}>
                                        <ProductDetail>
                                            <Image src={img} />
                                            <Details>
                                                <ProductName><b>Product:&nbsp;</b>{title}</ProductName>
                                                <Link to={`/product/${_id}`} >
                                                    <ProductID><b>ID:&nbsp;</b>{_id}</ProductID>
                                                </Link>
                                                <ProductSize><b>Size:&nbsp;</b>{size}<ProductColor color={color} /></ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAMountContainer>
                                                <ToggleIcon disabled={quantity <= 1} >
                                                    <FaMinus onClick={() => dispatch(toggleCartAmount({ product, type: 'decrease' }))} />
                                                </ToggleIcon>
                                                <ProductAmount>{quantity}</ProductAmount>
                                                <ToggleIcon>
                                                    <FaPlus onClick={() => dispatch(toggleCartAmount({ product, type: 'increase' }))} />
                                                </ToggleIcon>
                                            </ProductAMountContainer>
                                            <ProductPrice>$ {price * quantity}</ProductPrice>
                                            <RemoveProduct onClick={() => dispatch(removeProduct({ product }))}>Remove Item</RemoveProduct>
                                        </PriceDetail>
                                    </Product>
                                )
                            })
                        }
                    </Info>
                    {
                        cart.products.length > 0 &&
                        <Summary>
                            <SummaryTitle>ORDER RECAP</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping</SummaryItemText>
                                <SummaryItemPrice>free</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type='total'>
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            {
                                stripeToken ? (
                                    <span>Processing payment. Please wait...</span>
                                ) : (
                                    <StripeCheckout
                                        name='Cocci E-Shop'
                                        image='https://avatars.githubusercontent.com/u/99246305?v=4'
                                        shippingAddress
                                        billingAddress
                                        description={`Your total is $ ${cart.total}`}
                                        amount={cart.total * 100}
                                        token={onToken}
                                        stripeKey={STRIPE_KEY}
                                    >
                                        {
                                            user ? (
                                                <Button>
                                                    GO TO PAYMENT
                                                </Button>
                                            ) : (
                                                <Button disabled={true}>
                                                    PLEASE LOGIN TO PROCEED
                                                </Button>
                                            )
                                        }
                                    </StripeCheckout>
                                )
                            }
                            <ClearCart onClick={() => dispatch(clearCart())}>Clear cart</ClearCart>
                        </Summary>
                    }
                </Bottom>
            </Wrapper >
        </Container >
    )
}

export default Cart