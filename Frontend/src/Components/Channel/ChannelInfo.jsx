import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'

function ChannelInfo() {
const {ChannelId} = useParams()
const [channelInfo , setChannelInfo] = useState("")
const [channelSubButton , setChannelSubButton] = useState(false)
const darkMode = useSelector((state) => state.theme.DarkMode)
const API_BASE  = import.meta.env.VITE_API_URL;


useEffect(() => {
  const fetchChannelInfo = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/v1/users/c/${ChannelId}`)
        console.log(response , "Channel fetched sucessfully")
        setChannelInfo(  response.data.data)
        setChannelSubButton(response.data.data.isSubscribed)
    } catch (error) {
        console.error("Error while fetching the channel info")
    }
 }
 fetchChannelInfo()
}  , [])

const HandleSubscribe = async () => {
  try {
       if (!channelSubButton) {
         await axios.post(`${API_BASE}/api/v1/subs/substochannel/c/${ChannelId}`);
         setChannelSubButton(true);
           } else {
         await axios.post(`${API_BASE}/api/v1/subs/substochannel/c/${ChannelId}`);
        setChannelSubButton(false);
      }
  } catch (error) {
    console.error("error while subscribing the channel ")
  }
}

return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
  <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl dark:shadow-neutral-700/10 rounded-lg overflow-hidden max-w-lg w-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-2xl">
    {/* Cover image with overlapping avatar */}
    <div className="relative">
      <img
        src={channelInfo.coverImage}
        alt="Cover"
        className="w-full h-48 object-cover"
      />
      <img
        src={channelInfo.avatar}
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 absolute left-4 bottom-[-24px] transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
      />
    </div>
    {/* Channel details */}
    <div className="pt-16 pb-4 px-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {channelInfo.username}
      </h2>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        {channelInfo.fullname}
      </p>
      <div className="mt-4 flex justify-between items-center">
        {/* Subscriber count */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {channelInfo.subscibersCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Subscribers</p>
        </div>
        {/* Channel subscriptions count */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {channelInfo.channelssubscribedtoCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Channel Subs To</p>
        </div>
        {/* Subscribe button */}
        <div>
          <button
            onClick={HandleSubscribe}
            className={`${
              channelSubButton 
                ?  'bg-gray-600 hover:bg-gray-700 focus:ring-gray-400'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-400'
            } text-white px-6 py-2 rounded-full text-sm transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2`}
          >
            {channelSubButton ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
);

}

export default ChannelInfo