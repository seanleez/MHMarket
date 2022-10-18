import { Button } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../../../assets/icon/menu-icon.svg';
import { NAVIGATION_LIST } from '../../../const/const';
import './NavigationMenu.scss';

const NavigationMenu: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [classNameNestedItem, setClassNameNestedItem] =
    useState<string>('display-none');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseOver = (menu: any) => {
    menu.nestedList && setClassNameNestedItem('display-block');
  };

  const handleMouseOut = (menu: any) => {
    menu.nestedList && setClassNameNestedItem('display-none');
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      const navigationMenu = document.querySelector('.navigation-menu');
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !navigationMenu?.contains(event.target)
      ) {
        setIsOpen(isOpen);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navigation-container">
        <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
          <img src={MenuIcon} alt="MenuIcon" />
        </Button>

        {isOpen && (
          <ul className="navigation-menu">
            {NAVIGATION_LIST.map((menu, index) => (
              <li
                key={index}
                className={menu.nestedList && 'is-have-nestedList'}
                onMouseOver={() => handleMouseOver(menu)}
                onMouseOut={() => handleMouseOut(menu)}
                onClick={() => setIsOpen(false)}>
                {menu.nestedList ? (
                  <>
                    {menu.title}
                    <ul
                      className={`navigation-menu-nested-list ${classNameNestedItem}`}>
                      {menu.nestedList.map((item, index) => (
                        <li key={index}>
                          <Link to={item.url}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <Link to={menu.url}>{menu.title}</Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default NavigationMenu;
