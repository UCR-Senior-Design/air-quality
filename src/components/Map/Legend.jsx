// Legend.jsx
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaCircle } from 'react-icons/fa';

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.2)';
      div.style.backgroundColor = 'white';
      div.style.padding = '12px'; 
      div.style.border = '1px solid #ddd';
      div.style.color = '#555';
      div.style.width = '200px';
      
      div.innerHTML += '<h4 style="margin-bottom: 8px;">Showing recent data for:</h4>';      
      div.innerHTML += '<div id="inactive-icon"></div> Inactive<br>';
      div.innerHTML += '<div id="active-icon"></div> Currently Active<br>';
      div.innerHTML += '<div id="recently-active-icon"></div> Recently Active<br>';
    
      setTimeout(() => {
        ReactDOM.createRoot(document.getElementById('inactive-icon')).render(<FaCircle color="red" />);
        ReactDOM.createRoot(document.getElementById('active-icon')).render(<FaCircle color="green" />);
        ReactDOM.createRoot(document.getElementById('recently-active-icon')).render(<FaCircle color="yellow" />);
      });
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null; 
};

export default Legend;
