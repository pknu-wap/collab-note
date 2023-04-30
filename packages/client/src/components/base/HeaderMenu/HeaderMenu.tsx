// react
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// hooks
import useUser from '~/hooks/useUser';
import useDisclosure from '~/hooks/useDisclosure';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import useLogout from '~/hooks/useLogout';

// components
import * as S from './HeaderMenu.styles';
import { motion } from 'framer-motion';
import { Avatar } from '~/components/common';
import CaretDown from '~/components/vectors/CaretDown';

const HeaderDropdown = () => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(triggerRef, (e) => {
    if (!contentRef.current?.contains(e.target as Node)) {
      onClose();
    }
  });

  //TODO: 메뉴 리스트 수정하기
  const MenuItemList = [
    {
      text: 'My Page',
      onClick: () => navigate(`/user/${user?.username}`),
      red: false,
    },
    {
      text: 'Posts',
      onClick: () => navigate('/'),
      red: false,
    },
    {
      text: 'Search',
      onClick: () => navigate('/search'),
      red: false,
    },
    {
      text: 'Setting',
      onClick: () => navigate('/setting'),
      red: false,
    },
    {
      text: 'Logout',
      onClick: logout,
      red: true,
    },
  ];

  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
      <S.DropdownButton ref={triggerRef} onClick={onToggle}>
        <Avatar src={user?.profileImage || null} size="md" isBorder />
        <S.UserInfo>
          <div className="username">{user?.username}</div>
          <div className="displayName">@{user?.displayName}</div>
        </S.UserInfo>
        <CaretDown />
      </S.DropdownButton>
      <S.DropdownMenu
        variants={{
          open: {
            scale: 1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.5,
              delayChildren: 0.2,
              staggerChildren: 0.05,
            },
          },
          closed: {
            scale: 0,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        ref={contentRef}
      >
        {MenuItemList.map((item) => (
          <S.MenuItem
            key={item.text}
            onClick={item.onClick}
            red={item.red}
            variants={{
              open: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 300, damping: 24 },
              },
              closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
            }}
          >
            <S.MenuItemText>{item.text}</S.MenuItemText>
          </S.MenuItem>
        ))}
      </S.DropdownMenu>
    </motion.nav>
  );
};

export default HeaderDropdown;
