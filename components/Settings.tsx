import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { diff } from 'deep-object-diff';
import debounce from 'lodash.debounce';
import { encode } from 'base-64';
import React, { useEffect, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FaTelegramPlane } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';
import { displayToast, generateSelectOption, getTimezones } from '../client-utils';
import { User } from '../types';
import Overlay from './Overlay';
import Popover from './Popover';
import Select from './Select';

type Props = {
  onClose: () => void;
  initialValues: User;
  isOpen: boolean;
};

export default function Settings({ onClose, initialValues, isOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);

  const loadTimezones = debounce((input, cb) => {
    getTimezones(input).then((timezones) => cb(timezones));
  }, 700);

  useEffect(() => {
    async function createCharge() {
      const res = await fetch('http://localhost:3000/api/createCharge?email=' + initialValues.email);
      const data = await res.json();

      setPaymentUrl(data.hosted_url);
    }

    !paymentUrl.length && createCharge();
  }, []);

  const onSubmit = async (values: User) => {
    try {
      setIsLoading(true);
      const { apiKey, apiSecret } = values.binance;
      delete values.binance.apiKey;
      delete values.binance.apiSecret;

      const payload = diff(initialValues, values);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      values.binance.update && headers.append('Authorization', 'Basic ' + encode(`${apiKey}:${apiSecret}`));

      const response = await fetch('/api/settings/general', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ ...payload, email: initialValues.email }),
      });
      const { message: description } = await response.json();

      if (response.ok) {
        displayToast({
          description: 'Settings updated',
          status: 'success',
          title: 'Success',
        });

        const event = new Event('visibilitychange');
        document.dispatchEvent(event);

        onClose();
      } else {
        setIsLoading(false);
        displayToast({
          description,
          title: 'Error',
        });
      }
    } catch {
      setIsLoading(false);
      displayToast({
        description: 'Something went wrong, please try again.',
        title: 'Error',
      });
    }
  };

  return (
    <Overlay
      isLoading={isLoading || !paymentUrl.length}
      isOpen={isOpen}
      formId="settings"
      onClose={() => {
        if (!isLoading || !paymentUrl.length) {
          onClose();
        }
      }}
      ref={btnRef}
      subTitle="Edit your global timezone and notification settings here."
      title="Settings"
    >
      <Form
        initialValues={initialValues}
        mutators={{
          updateTimezone([value], state, { changeValue }) {
            changeValue(state, 'timezone', () => value);
          },
          enableBinance([value], state, { changeValue }) {
            changeValue(state, 'binance.update', () => value);
          },
          enableTelegram([value], state, { changeValue }) {
            changeValue(state, 'telegram.enabled', () => value);
          },
        }}
        onSubmit={onSubmit}
      >
        {({ form, handleSubmit, pristine, values }) => {
          if (btnRef.current) {
            if (pristine) {
              btnRef.current.disabled = true;
            } else {
              btnRef.current.disabled = false;
            }
          }
          return (
            <form role="form" id="settings" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Field name="timezone">
                    {({ input }) => (
                      <FormControl id="timezone">
                        <FormLabel mb="0">
                          <Stack align="center" isInline spacing={1}>
                            <Text fontSize="17px" fontWeight="bold">
                              Timezone
                            </Text>

                            <Popover title="Default timezone">
                              Unless otherwise specified, this is the timezone used when scheduling your jobs.
                            </Popover>
                          </Stack>
                        </FormLabel>

                        <Select
                          inputId="timezone"
                          isAsync
                          loadOptions={loadTimezones}
                          name={input.name}
                          onChange={({ value }) => form.mutators.updateTimezone(value)}
                          value={generateSelectOption(values.timezone || '')}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box>
                  <Stack direction={['column', 'row']} spacing={3}>
                    <Field name="binance.apiKey">
                      {({ input }) => (
                        <FormControl id="apiKey">
                          <FormLabel aria-label="binance api key" mb="0">
                            <Stack align="center" isInline spacing={1}>
                              <Text fontSize="17px" fontWeight="bold">
                                Binance api key
                              </Text>

                              <Popover title="Binance API key">
                                Your Binance api key is used in tandem with your Binance api secret to allow us to place
                                orders for you. To learn more about binance api keys, click{' '}
                                <Link
                                  color="blue.500"
                                  href="https://www.binance.com/en/support/faq/360002502072/"
                                  isExternal
                                >
                                  here
                                </Link>
                              </Popover>
                            </Stack>
                          </FormLabel>

                          <InputGroup>
                            <InputRightElement pointerEvents="none">
                              <Icon as={SiBinance} boxSize="25px" color="#F0B90B" />
                            </InputRightElement>

                            <Input
                              bgColor="white"
                              isDisabled={!values.binance.update}
                              name={input.name}
                              onBlur={input.onBlur}
                              onChange={input.onChange}
                              value={values.binance.update ? input.value : '****'}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="binance.apiSecret">
                      {({ input }) => (
                        <FormControl id="apiSecret">
                          <FormLabel aria-label="binance api secret" mb="0">
                            <Stack align="center" isInline spacing={1}>
                              <Text fontSize="17px" fontWeight="bold">
                                Binance secret key
                              </Text>

                              <Popover title="Binance API Secret">
                                Your Binance api secret is used in tandem with your Binance api key to allow us to place
                                orders for you. To learn more about binance api keys, click{' '}
                                <Link
                                  color="blue.500"
                                  href="https://www.binance.com/en/support/faq/360002502072/"
                                  isExternal
                                >
                                  here
                                </Link>
                              </Popover>
                            </Stack>
                          </FormLabel>

                          <InputGroup>
                            <InputRightElement pointerEvents="none">
                              <Icon as={SiBinance} boxSize="25px" color="#F0B90B" />
                            </InputRightElement>

                            <Input
                              bgColor="white"
                              isDisabled={!values.binance.update}
                              name={input.name}
                              onBlur={input.onBlur}
                              onChange={input.onChange}
                              value={values.binance.update ? input.value : '****'}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  <Field name="binance.update">
                    {({ input }) => (
                      <Text color="gray.600" fontSize="sm" mt="0.5rem">
                        Update Binance API Keys ?&nbsp;&nbsp;
                        <Switch
                          name={input.name}
                          isChecked={values.binance.update}
                          onChange={({ target }) => form.mutators.enableBinance(target.checked)}
                          color="#622EC3"
                        />
                        &nbsp;&nbsp;
                        <span style={{ fontSize: 12 }}>**** Your current keys are hidden for security</span>
                      </Text>
                    )}
                  </Field>
                </Box>

                <Box>
                  <Stack direction={['column', 'row']} spacing={3}>
                    <Field name="telegram.botToken">
                      {({ input }) => (
                        <FormControl id="botToken">
                          <FormLabel aria-label="telegram bot token" mb="0">
                            <Stack align="center" isInline spacing={1}>
                              <Text fontSize="17px" fontWeight="bold">
                                Telegram bot token
                              </Text>

                              <Popover title="Telegram Notifications">
                                Your Telegam bot token is used in tandem with your Telegam chatId to send you updates
                                about your jobs. To learn more about Telegram bots, click{' '}
                                <Link
                                  color="blue.500"
                                  href="https://dev.to/rizkyrajitha/get-notifications-with-telegram-bot-537l"
                                  isExternal
                                >
                                  here
                                </Link>
                              </Popover>
                            </Stack>
                          </FormLabel>

                          <InputGroup>
                            <InputRightElement pointerEvents="none">
                              <Icon as={FaTelegramPlane} boxSize="25px" color="#8ab4f8" />
                            </InputRightElement>

                            <Input
                              bgColor="white"
                              isDisabled={!values.telegram.enabled}
                              name={input.name}
                              onBlur={input.onBlur}
                              onChange={input.onChange}
                              value={input.value}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="telegram.chatId">
                      {({ input }) => (
                        <FormControl id="chatId">
                          <FormLabel aria-label="telegram chat id" mb="0">
                            <Stack align="center" isInline spacing={1}>
                              <Text fontSize="17px" fontWeight="bold">
                                Telegram chatId
                              </Text>

                              <Popover title="Telegram Notifications">
                                Your Telegam chatId is used in tandem with your Telegam bot token to send you updates
                                about your jobs. To learn more about Telegram bots, click{' '}
                                <Link
                                  color="blue.500"
                                  href="https://dev.to/rizkyrajitha/get-notifications-with-telegram-bot-537l"
                                  isExternal
                                >
                                  here
                                </Link>
                              </Popover>
                            </Stack>
                          </FormLabel>

                          <InputGroup>
                            <InputRightElement pointerEvents="none">
                              <Icon as={FaTelegramPlane} boxSize="25px" color="#8ab4f8" />
                            </InputRightElement>

                            <Input
                              bgColor="white"
                              isDisabled={!values.telegram.enabled}
                              name={input.name}
                              onBlur={input.onBlur}
                              onChange={input.onChange}
                              value={input.value}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  <Field name="telegram.enabled">
                    {({ input }) => (
                      <Text color="gray.600" fontSize="sm" mt="0.5rem">
                        Enable Telegram Notifications ?&nbsp;&nbsp;
                        <Switch
                          isChecked={values.telegram.enabled}
                          name={input.name}
                          onChange={({ target }) => form.mutators.enableTelegram(target.checked)}
                          color="#622EC3"
                        />
                      </Text>
                    )}
                  </Field>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mt="16px">
                  <Button
                    bgImage="linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%)"
                    textColor="white"
                    borderRadius="2xl"
                    boxShadow="xl"
                    isLoading={!paymentUrl.length}
                    onClick={() => (window.location.href = paymentUrl)}
                  >
                    Pay Subscription
                  </Button>
                </Box>
              </Stack>
            </form>
          );
        }}
      </Form>
    </Overlay>
  );
}
