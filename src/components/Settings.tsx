import {
  Box,
  Button,
  Flex,
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
  Center,
} from '@chakra-ui/react';
import { diff } from 'deep-object-diff';
import debounce from 'lodash.debounce';
import { encode } from 'base-64';
import React, { useEffect, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FaTelegramPlane } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';
import { displayToast, generateSelectOption, getTimezones } from '../client-utils';
import { User } from 'types';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Popover from 'src/components/Popover';
import Select from 'src/components/Select';

type Props = {
  user: User;
};

export default function Settings({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const subscriptionUntil = user.subscriptionUntil ? new Date(user.subscriptionUntil) : undefined;
  const [paymentUrl, setPaymentUrl] = useState('');
  const [pendingPayment, setPendingPayment] = useState(false);

  useEffect(() => {
    async function createCharge() {
      const res = await fetch(`/api/createCharge?email=${user.email}&subscription=${user.subscriptionUntil || ''}`);
      const data = await res.json();

      setPaymentUrl(data.hosted_url);
    }

    !paymentUrl?.length && createCharge();
  }, []);

  function getSubscriptionText() {
    if (pendingPayment) return 'Pending Payment';
    if (!subscriptionUntil) return 'No Active Subsciptions';

    return (
      (subscriptionUntil < new Date() ? 'Subsciption Expired At ' : 'Subsciptions Active Until ') +
      subscriptionUntil.toLocaleString()
    );
  }

  const loadTimezones = debounce((input, cb) => {
    getTimezones(input).then((timezones) => cb(timezones));
  }, 700);

  const onSubmit = async (values: User) => {
    try {
      setIsLoading(true);
      const { apiKey, apiSecret } = values.binance;
      delete values.binance.apiKey;
      delete values.binance.apiSecret;

      const payload = diff(user, values);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      values.binance?.update && headers.append('Authorization', 'Basic ' + encode(`${apiKey}:${apiSecret}`));

      const response = await fetch('/api/settings/general', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ ...payload, email: user.email }),
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

  function payWithCrypto() {
    setPendingPayment(true);
    window.open(paymentUrl, '_blank')?.focus();
  }

  function renderHeader(title: string, subTitle: string) {
    return (
      <Box textAlign="center">
        <Text color="gray.900" fontSize="lg" fontWeight="bold">
          {title}
        </Text>

        <Text color="gray.600" fontSize="sm">
          {subTitle}
        </Text>
      </Box>
    );
  }

  function renderFooter(text: string, loading: boolean, onClick?: () => void) {
    return (
      <Box borderTop="1px solid #E2E8F0">
        <Stack spacing={2} width="100%" direction="row">
          <Button
            isFullWidth
            bgImage="linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%)"
            textColor="white"
            borderRadius="2xl"
            boxShadow="xl"
            _hover={{ opacity: 0.5, backgroundColor: 'unset' }}
            form={onClick ? undefined : 'settings'}
            isLoading={loading}
            ref={btnRef}
            onClick={onClick}
            type="submit"
          >
            {text}
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    // @ts-ignore
    <ErrorBoundary>
      <Flex width="100%">
        <Flex flex={3} bgColor="#EEE" flexDirection="column" alignItems="center" justifyContent="space-around">
          {renderHeader('Settings', 'Edit your global timezone and notification settings here.')}

          <Form
            initialValues={user}
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
                btnRef.current.disabled = pristine;
              }

              return (
                <form role="form" id="settings" onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Flex flexDirection="column" justifyContent="space-around">
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
                    </Flex>

                    <Flex marginTop="60px" flexDirection="column" justifyContent="space-around">
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
                                    Your Binance api key is used in tandem with your Binance api secret to allow us to
                                    place orders for you. To learn more about binance api keys, click{' '}
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
                                  isDisabled={!values.binance?.update}
                                  name={input.name}
                                  onBlur={input.onBlur}
                                  onChange={input.onChange}
                                  value={values.binance?.update ? input.value : '****'}
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
                                    Your Binance api secret is used in tandem with your Binance api key to allow us to
                                    place orders for you. To learn more about binance api keys, click{' '}
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
                                  isDisabled={!values.binance?.update}
                                  name={input.name}
                                  onBlur={input.onBlur}
                                  onChange={input.onChange}
                                  value={values.binance?.update ? input.value : '****'}
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
                              isChecked={values.binance?.update}
                              onChange={({ target }) => form.mutators.enableBinance(target.checked)}
                              color="#622EC3"
                            />
                            &nbsp;&nbsp;
                            <span style={{ fontSize: 12 }}>**** Your current keys are hidden for security</span>
                          </Text>
                        )}
                      </Field>
                    </Flex>

                    <Flex marginTop="80px" flexDirection="column" justifyContent="space-around">
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
                                    Your Telegam bot token is used in tandem with your Telegam chatId to send you
                                    updates about your jobs. To learn more about Telegram bots, click{' '}
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
                                    Your Telegam chatId is used in tandem with your Telegam bot token to send you
                                    updates about your jobs. To learn more about Telegram bots, click{' '}
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
                    </Flex>
                  </Stack>
                </form>
              );
            }}
          </Form>

          {renderFooter('Save', isLoading)}
        </Flex>

        <Flex
          flex={2}
          bgColor="#EEE"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          borderLeft="1px solid lightGray"
        >
          {renderHeader('Moonbot', 'dca subscription')}

          <Center>
            <Text color="gray.800" fontSize="xl" fontWeight="bold">
              {getSubscriptionText()}
            </Text>
          </Center>

          {renderFooter('Pay With Crypto', !paymentUrl?.length, payWithCrypto)}
        </Flex>
      </Flex>
    </ErrorBoundary>
  );
}
