import React, { useMemo, useState } from 'react';
import './BreweryCard.scss';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import GoogleMapReact, { Coords } from 'google-map-react';
import { BsPinMap } from 'react-icons/bs';
import { MdOutlineOpenInNew, MdLocalPhone } from 'react-icons/md';
import { HiChevronDown } from 'react-icons/hi';
import { formatPhoneNumber } from '../../utilities';

const key = process.env.REACT_APP_KEY || '';

type Props = {
  brewery: {
    name: string;
    type: 'micro' | 'regional' | 'brewpub' | 'large' | 'planning' | 'contract' | 'proprietor' | 'closed';
    address: string;
    URL: string | null;
    lat: string | null;
    lng: string | null;
    phone: string | null;
  };
};

type BreweryType = {
  micro: string[];
  nano: string[];
  regional: string[];
  brewpub: string[];
  large: string[];
  planning: string[];
  contract: string[];
  proprietor: string[];
  closed: string[];
};

const typeMap: BreweryType = {
  micro: [
    'primary',
    'Most craft breweries. For example, Samual Adams is still considered a micro brewery.',
  ],
  nano: ['secondary', 'An extremely small brewery which typically only distributes locally.'],
  regional: [
    'success',
    'A regional location of an expanded brewery. Ex. Sierra Nevada’s Asheville, NC location.',
  ],
  brewpub: ['danger', 'A beer-focused restaurant or restaurant/bar with a brewery on-premise.'],
  large: ['warning', 'A very large brewery. Likely not for visitors. Ex. Miller-Coors.'],
  planning: ['info', 'A brewery in planning or not yet opened to the public.'],
  contract: ['info', 'A brewery that uses another brewery’s equipment.'],
  proprietor: ['info', 'Similar to contract brewing but refers more to a brewery incubator.'],
  closed: ['info', 'A location which has been closed.'],
};

function BreweryCard({ brewery }: Props) {
  const { name, type, address, URL, lat, lng, phone } = brewery;
  const [open, setOpen] = useState(false);
  const bg = typeMap[type][0];
  const formattedPhoneNumber = useMemo(() => formatPhoneNumber(phone), [phone]);

  const coords = useMemo(() => {
    if (lat && lng) {
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    }
  }, [lat, lng]);

  const Marker = ({ text, lat, lng }: { text: string; lat: number; lng: number }) => (
    <div className="marker-and-text">
      <div className="marker"></div>;<div className="marker-text">{text}</div>;
    </div>
  );
  const center = {
    lat: coords?.lat,
    lng: coords?.lng,
  };
  const zoom = 11;

  return (
    <div className="brewery-card">
      <div className="brewery-card-row-1">
        <h4>{name}</h4>
        <Badge pill bg={bg}>
          {type}
        </Badge>
      </div>

      <div className="brewery-card-row-2">
        <span className="address-pin icon">
          <a
            href={`http://maps.google.com/maps?q=${name}+Austin,+TX">View map`}
            target="_blank"
            rel="noreferrer"
          >
            <BsPinMap />
          </a>
        </span>
        <a
          href={`http://maps.google.com/maps?q=${name}+Austin,+TX">View map`}
          target="_blank"
          rel="noreferrer"
        >
          {address}
        </a>
      </div>

      {phone && (
        <div className="brewery-card-row-3">
          <span className="phone icon">
            <a href={`tel:${formattedPhoneNumber}`}>
              <MdLocalPhone />
            </a>
          </span>
          <a href={`tel:${formattedPhoneNumber}`}>{formattedPhoneNumber}</a>
        </div>
      )}

      <div className="brewery-card-row-4">
        <div className="brewery-card-row-4-left">
          {URL ? (
            <>
              <span className="open-in-new icon">
                <a href={URL} target="_blank" rel="noreferrer">
                  <MdOutlineOpenInNew />
                </a>
              </span>
              <a href={URL} target="_blank" rel="noreferrer">
                {URL.replace(/(https?):\/\/(www.)?/, '')}
              </a>
            </>
          ) : (
            ''
          )}
        </div>

        {coords && (
          <div className="brewery-card-row-4-right">
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="collapse-text"
              aria-expanded={open}
              variant="primary"
              size="sm"
              className="collapse-text-button"
            >
              <HiChevronDown className={!open ? 'restore-chevron' : 'invert-chevron'} />
            </Button>{' '}
          </div>
        )}
      </div>

      {coords && (
        <Collapse in={open}>
          <div className="collapse-text-body">
            <GoogleMapReact
              bootstrapURLKeys={{ key: key }}
              defaultCenter={center as Coords}
              defaultZoom={zoom}
            >
              <Marker lat={coords.lat} lng={coords.lng} text={name} />
            </GoogleMapReact>
          </div>
        </Collapse>
      )}
    </div>
  );
}

export default BreweryCard;
