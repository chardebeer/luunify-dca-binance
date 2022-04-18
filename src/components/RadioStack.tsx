import React from 'react';
import { useRadio, Box, UseRadioProps, HStack, useRadioGroup } from '@chakra-ui/react';

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode;
}

interface Props {
  name: string;
  options: string[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}

export default function RadioStack({ name, options, onChange, disabled }: Props) {
  function RadioCard(props: RadioCardProps) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          bgColor="white"
          textColor="gray.700"
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            borderColor: 'yellow.500',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          _disabled={{
            borderColor: 'gray.600',
            opacity: 0.5,
            cursor: 'not-allowed',
          }}
          px={5}
          pt={3}
          pb={2.5}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: options[0],
    onChange,
  });

  return (
    <HStack {...getRootProps()}>
      {options.map((value) => (
        <RadioCard key={value} {...getRadioProps({ value })} isDisabled={disabled}>
          {value}
        </RadioCard>
      ))}
    </HStack>
  );
}
