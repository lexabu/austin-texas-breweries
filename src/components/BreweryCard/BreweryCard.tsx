import React, { useState } from 'react';
import './BreweryCard.scss';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import GoogleMapReact from 'google-map-react';
import { BsPinMap } from 'react-icons/bs';
import { MdOutlineOpenInNew, MdLocalPhone } from 'react-icons/md';
import { HiChevronDown } from 'react-icons/hi';

const key = process.env.REACT_APP_KEY || '';

type Props = {
  brewery: {
    name: string;
    type: 'micro' | 'regional' | 'brewpub' | 'large' | 'planning' | 'contract' | 'proprietor' | 'closed';
    address: string;
    URL: string;
    lat: number;
    lng: number;
    phone: number;
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

function formatPhoneNumber(phoneNumber: number) {
  if (!phoneNumber) {
    return null;
  }
  let formattedPhoneNumber = phoneNumber.toString();

  if (formattedPhoneNumber[0] === '1') {
    formattedPhoneNumber = formattedPhoneNumber.slice(1, formattedPhoneNumber.length - 1);
  }
  formattedPhoneNumber =
    formattedPhoneNumber.slice(0, 3) +
    '-' +
    formattedPhoneNumber.slice(3, 6) +
    '-' +
    formattedPhoneNumber.slice(6);

  return formattedPhoneNumber;
}

function BreweryCard({ brewery }: Props) {
  const { name, type, address, URL, lat, lng, phone } = brewery;
  const [open, setOpen] = useState(false);
  const bg = typeMap[type][0];

  const Marker = ({ text, lat, lng }: { text: string; lat: number; lng: number }) => (
    <div className="marker-and-text">
      <div className="marker"></div>;<div className="marker-text">{text}</div>;
    </div>
  );
  const center = {
    lat: lat,
    lng: lng,
  };
  const zoom = 11;

  return (
    <div className="brewery-card">
      <div className="brewery-card-row-1">
        {name}
        <Badge pill bg={bg}>
          {type}
        </Badge>
      </div>

      <div className="brewery-card-row-2">
        <span className="address-pin icon">
          <BsPinMap />
        </span>
        {address}
      </div>

      {phone && (
        <div className="brewery-card-row-3">
          <span className="phone icon">
            <MdLocalPhone />
          </span>
          {formatPhoneNumber(phone)}
        </div>
      )}

      <div className="brewery-card-row-4">
        <div className="brewery-card-row-4-left">
          {URL ? (
            <>
              <span className="open-in-new icon">
                <MdOutlineOpenInNew />
              </span>
              <a href={URL} className="brewery-link">
                {URL.replace(/(https?):\/\/(www.)?/, '')}
              </a>
            </>
          ) : (
            ''
          )}
        </div>

        {lng ? (
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
        ) : (
          <></>
        )}
      </div>
      <Collapse in={open}>
        <div className="collapse-text-body">
          <GoogleMapReact bootstrapURLKeys={{ key: key }} defaultCenter={center} defaultZoom={zoom}>
            <Marker lat={lat} lng={lng} text={name} />
          </GoogleMapReact>
        </div>
      </Collapse>
    </div>
  );
}

export default BreweryCard;
