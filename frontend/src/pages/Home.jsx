import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4 bg-gray-100 min-h-screen'>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4" onClick={()=>{navigate('/')}}>Logout</button>
      <div className='flex justify-center items-center gap-x-8 mb-8'>
        <button
          className={`text-lg py-2 px-4 focus:outline-none ${
            showType === 'table' ? 'bg-black text-white' : 'bg-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className={`text-lg py-2 px-4 focus:outline-none ${
            showType === 'card' ? 'bg-black text-white' : 'bg-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
