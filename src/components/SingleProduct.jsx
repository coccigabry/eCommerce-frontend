import styled from 'styled-components'
import { BiSearchAlt2, BiHeart } from 'react-icons/bi'
import { mobile } from '../responsive/responsive'
import { Link } from 'react-router-dom'


const Container = styled.div`
    background-color: #f5fbfd;
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
`
const Image = styled.img`
    height: 75%;
    z-index: 2;

    ${mobile({
    height: '50%',
})}
`
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.2);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s ease;

    &:hover{
        opacity: 1;
    }
`
const Icon = styled.div`
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 1s ease;
    cursor: pointer;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`
const IconWish = styled.div`
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 1s ease;
    cursor: pointer;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

const SingleProduct = ({ ...item }) => {


    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`} >
                        <BiSearchAlt2 />
                    </Link>
                </Icon>
                <IconWish>
                    <BiHeart />
                </IconWish>
            </Info>
        </Container>
    )
}

export default SingleProduct