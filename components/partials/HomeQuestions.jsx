import { Radio } from 'antd';
import {FaCheckCircle} from 'react-icons/fa';

function HomeQuestions(props) {

    function onChange(e) {
        console.log(`radio checked:${e.target.value}`);
      }


    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='lg:px-3 lg:py-5'>
            <div className='bg-black/90 rounded py-5 px-3 my-8 lg:my-0'>
                <h3 className='text-center text-3xl mb-0.5 text-white font-bold'>You stand a chance to win amazing prices from home on this segment of the show</h3>
                <p className='text-center text-lg text-white'>(watch out for the bible star home play)</p>

                {/* <form onSubmit={handleSubmit} className='py-8'>
                    <h4 className='text-2xl text-white text-center font-bold mb-4'>What is the name of the head of the house?</h4>
                    <div className='lg:mx-8 mx-auto'>
                        <Radio.Group buttonStyle="solid" className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
                            <Radio.Button value="a" className='text-lg '>
                                <FaCheckCircle className='inline-block mr-3' />
                                <span>Hangzhou</span>
                            </Radio.Button>
                            <Radio.Button value="b" className='text-lg '>
                                <FaCheckCircle className='inline-block mr-3' />
                                <span>Shanghai</span>
                            </Radio.Button>
                            <Radio.Button value="c" className='text-lg '>
                                <FaCheckCircle className='inline-block mr-3' />
                                <span>Beijing</span>
                            </Radio.Button>
                            <Radio.Button value="d" className='text-lg '>
                                <FaCheckCircle className='inline-block mr-3' />
                                <span>Chengjou</span>
                            </Radio.Button>
                        </Radio.Group>

                    </div>
                    <div className='pt-8 flex flex-col sm:flex-row justify-around'>
                        <input type="text" placeholder='Enter Username' className='text-center text-lg text-black font-bold px-4 py-3 w-full sm:w-1/2 rounded-t sm:rounded-l sm:rounded-t-0 focus:outline-none' />
                        <input type="submit" value="Submit" className='bg-brand-red text-lg px-6 py-3 rounded-b sm:rounded-r sm:rounded-b-0 font-bold text-white w-full sm:w-1/2 cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out' />
                    </div>
                </form> */}

                <p className='text-center text-2xl lg:text-4xl font-bold text-white mt-8 mb-10'>Coming Soon...</p>
            </div>   
        </div>

    )
}

export default HomeQuestions
