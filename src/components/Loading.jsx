import {ThreeCircles} from 'react-loader-spinner'

export const Loading =()=>{
    return (
        <section className='loadingSection'>
        <ThreeCircles
  height="200"
  width="200"
  color="#00CED1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/></section>
    )
}