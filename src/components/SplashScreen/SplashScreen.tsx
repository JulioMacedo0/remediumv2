import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Dimensions} from 'react-native';
import {Text} from '../Text/Text';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../theme/theme';

const {width, height} = Dimensions.get('window');

type SplashScreenProps = {
  onAnimationComplete?: () => void;
  isSessionRestored?: boolean;
};

export function SplashScreen({
  onAnimationComplete,
  isSessionRestored = false,
}: SplashScreenProps) {
  const theme = useTheme<Theme>();

  const fadeIn = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const breathe = useRef(new Animated.Value(1)).current;
  const finalScale = useRef(new Animated.Value(1)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  // Animação de "respiração" - o logo fica pulsando suavemente enquanto aguarda
  const startBreathingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0.95,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // Animação inicial (fade in e scale)
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startBreathingAnimation();
    });
  }, [fadeIn, scale, startBreathingAnimation]);

  // Animação final quando a sessão é restaurada
  useEffect(() => {
    if (isSessionRestored) {
      // Para a animação de respiração
      breathe.stopAnimation();

      // Realiza a animação final: escala aumenta e desaparece
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(finalScale, {
            toValue: 20, // Escala enorme para cobrir a tela
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(fadeOut, {
            toValue: 0,
            duration: 500,
            delay: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }
  }, [isSessionRestored, finalScale, fadeOut, onAnimationComplete, breathe]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          opacity: fadeOut,
        },
      ]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeIn,
            transform: [{scale: scale}, {scale: breathe}, {scale: finalScale}],
          },
        ]}>
        <Text preset="headingLarge" color="primary" style={styles.logoText}>
          Remedium
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 38,
    fontWeight: 'bold',
  },
});
