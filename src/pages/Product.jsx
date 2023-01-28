import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { mobile } from '../responsive/responsive'
import { publicRequest } from '../requestMethods'
import { addProduct } from '../redux/features/cartSlice'
import { useDispatch } from 'react-redux'


const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;

    ${mobile({
    padding: '10',
    flexDirection: 'column',
})}
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
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: contain;

    ${mobile({
    height: '40vh',
})}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;

    ${mobile({
    padding: '10px',
})}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;

    ${mobile({
    width: '100%',
})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
/*     ${props => props.active === true && css`
        border: 3px solid teal;
    `} */
    border-radius: 50%;
    border: 1px solid black;
    background-color: ${props => props.color};
    margin: 0 2px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({
    width: '100%',
})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
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
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;  
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: #fff;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: teal;
    }

    &:disabled{
        border: none;
        background-color: lightgrey;
        cursor: not-allowed;
    }
`

const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await publicRequest.get(`/product/find/${id}`)
                setProduct(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    const handleQuantity = (action) => {
        action == 'decrease' ? quantity > 1 && setQuantity(quantity - 1) : setQuantity(quantity + 1)
    }


    return (
        <Container>
            <Top>
                <Link to='/products'>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Wishlist</TopText>
                </TopTexts>
            </Top>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color:</FilterTitle>
                            {
                                product.color?.map(c => (
                                    <FilterColor
                                        color={c}
                                        key={c}
                                        onClick={() => setColor(c)}
                                    />
                                ))
                            }
                            <p>{color}</p>
                        </Filter>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                <FilterSizeOption default>Select</FilterSizeOption>
                                {
                                    product.size?.map(s => (
                                        <FilterSizeOption key={s} >
                                            {s}
                                        </FilterSizeOption>
                                    ))
                                }
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <ToggleIcon disabled={quantity <= 1}>
                                <FaMinus onClick={() => handleQuantity('decrease')} />
                            </ToggleIcon>
                            <Amount>{quantity}</Amount>
                            <ToggleIcon>
                                <FaPlus onClick={() => handleQuantity('increase')} />
                            </ToggleIcon>
                        </AmountContainer>
                        <Button
                            disabled={!color || !size}
                            onClick={() => dispatch(addProduct({ ...product, quantity, color, size }))}
                        >
                            Add to Cart
                        </Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
        </Container>
    )
}

export default Product