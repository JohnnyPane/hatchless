import { Link } from "react-router-dom";
import { Title, Button, Stack, Box, Group, Text } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { useMe } from "../../hooks/useMe.js";
import { useTransition } from "../../contexts/TransitionContext.jsx";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import "./Home.scss";
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";


const Home = () => {
  const { data: user } = useMe();
  const flyShop = user?.fly_shop;
  const { data: rivers, search, isLoading } = useResourceContext();
  const { startTransition, isTransitioning } = useTransition();

  const searchStyles = {
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.8)',
    },
    icon: {color: 'white'},
  }

  const searchConfig = {
    size: "xl",
    radius: "md",
    color: "white",
    styles: searchStyles,
    w: "min(500px, 90%)",
    classNames: { input: 'home-search-input' },
  }

  const searchIcon = <IconSearch color="white" style={{ opacity: 0.7 }} size={18}/>;

  const containerVariants = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.2, delay: 0 }
    }
  };

  const showList = rivers.length > 0;
  const showNoResults = search.length > 0 && rivers.length === 0 && !isLoading;

  let content = null;
  if (showList) {
    content = rivers.map((river) => (
      <motion.div key={river.id} variants={itemVariants}>
        <Button
          onClick={() => startTransition(`/rivers/${river.id}`)}
          variant="subtle"
          size="lg"
          color="white"
          radius="xl"
          style={{ margin: '8px' }}
        >
          {river.attributes.name}
        </Button>
      </motion.div>
    ));
  } else if (showNoResults) {
    content = (
      <motion.div key="no-results-message" variants={itemVariants}>
        <Title
          order={3}
          style={{
            color: 'white',
            marginTop: '16px',
            fontWeight: 500,
          }}
        >
          No rivers match your search.
        </Title>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="hero-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box>
        <header className="home-navbar">
          <Group justify="space-between" h="100%" w="100%" px={20}>
            <Group h="100%" gap={0} visibleFrom="sm">

              <Link to="/feed" className="home-logo">
                <Title order={2} className="margin-none">Hatchless</Title>
              </Link>
            </Group>

            <div className="flex row align-center">
              {flyShop && <Button size="compact-md" onClick={() => startTransition(`/fly_shops/${flyShop.id}/my_fly_shop`)} variant="transparent" className="animated-link margin-right" color="white">
                <Text color="white" size="sm">{flyShop.name}</Text>
              </Button>}

              <Button size="compact-md" onClick={() => startTransition(`/feed`)} variant="transparent" className="animated-link margin-right" color="white">
                <Text color="white" size="sm">Feed</Text>
              </Button>

              <LoginLogoutToggle textColor="white" themeColor="white" />
            </div>
          </Group>
        </header>
      </Box>

      <Stack align="center" className="hero-search-container" spacing="xl">
        <Title
          order={1}
          style={{
            color: 'white',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 600,
          }}
        >
          Find your next hatch.
        </Title>

        <HatchlessSearch
          config={searchConfig}
          searchType='input'
          nameKey='name'
          icon={searchIcon}
          debounceValue={200}
          searchLabel="rivers"
        />

        <AnimatePresence mode="wait">
          {(showList || showNoResults) && <motion.div
            key={search || 'all-rivers'}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
          >
            {content}
          </motion.div>}
      </AnimatePresence>
      </Stack>

      <div className="hatch-particles">
        {[...Array(15)].map((_, i) => (
          <span key={i} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`
          }} />
        ))}
      </div>
    </motion.div>
  );
}

export default Home;