import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function ChannelInfo() {
const {ChannelId} = useParams()
const [channelInfo , setChannelInfo] = useState("")
const [channelSubButton , setChannelSubButton] = useState(false)


useEffect(() => {
  const fetchChannelInfo = async () => {
    try {
        const response = await axios.get(`/api/users/c/${ChannelId}`)
        console.log(response.data.data , "Channel fetched sucessfully")
        setChannelInfo(  response.data.data)
    } catch (error) {
        console.error("Error while fetching the channel info")
    }
 }
 fetchChannelInfo()
}  , [])

const HandleSubscribe = async () => {
  try {
    const response = await axios.post(`/api/subs/substochannel/c/${ChannelId}`)
    console.log(response , "Channel subscribe sucessfully!!")
    setChannelSubButton(true)
  } catch (error) {
    console.error("error while subscribing the channel ")
  }
}

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
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
          className="w-24 h-24 rounded-full border-4 border-white absolute left-4 bottom-[-24px] transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
        />
      </div>
      {/* Channel details */}
      <div className="pt-16 pb-4 px-4">
        <h2 className="text-3xl font-bold text-gray-800">{channelInfo.username}</h2>
        <p className="mt-2 text-lg text-gray-700">{channelInfo.fullname}</p>
        <div className="mt-4 flex justify-between items-center">
          {/* Subscriber count */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">{channelInfo.subscibersCount}</p>
            <p className="text-xs text-gray-500">Subscribers</p>
          </div>
          {/* Channel subscriptions count */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">{channelInfo.channelssubscribedtoCount}</p>
            <p className="text-xs text-gray-500">Channel Subs To</p>
          </div>
          {/* Subscribe button */}
          <div>
            <button onClick={HandleSubscribe} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
            {channelSubButton ?  'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default ChannelInfo