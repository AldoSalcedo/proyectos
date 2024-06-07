import { useState } from 'react'

export const Home = () => {
  return (
    <div className="h-screen w-screen grid grid-rows-6 grid-cols-4 gap-4 p-4">
      {/* Sidebar */}
      <div className="row-span-6 col-span-1 bg-gray-800 text-white p-4">
        <h1 className="text-xl mb-4">Sidebar</h1>
        <ul>
          <li className="mb-2">
            <a href="#">Home</a>
          </li>
          <li className="mb-2">
            <a href="#">About</a>
          </li>
          <li className="mb-2">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>

      {/* Widgets */}
      <div className="col-span-3 row-span-1 bg-white rounded-3xl drop-shadow-lg p-6">
        {/* Widget Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-1">
          Widget 1
        </div>
      </div>
      <div className="col-span-3 row-span-2 bg-white rounded-3xl drop-shadow-lg p-6">
        Widget 2
      </div>
      <div className="col-span-3 row-span-3 bg-white rounded-3xl drop-shadow-lg p-6">
        Widget 3
      </div>
    </div>
  )
}
