import { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { BIG_ZERO } from 'utils/bigNumber'
import useToast from './useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [costs, setCosts] = useState({
    numberLacToReactivate: BIG_ZERO,
    numberLacToRegister: BIG_ZERO,
    numberLacToUpdate: BIG_ZERO,
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberLacToReactivate, numberLacToRegister, numberLacToUpdate] = await makeBatchRequest([
          profileContract.methods.numberLacToReactivate().call,
          profileContract.methods.numberLacToRegister().call,
          profileContract.methods.numberLacToUpdate().call,
        ])

        setCosts({
          numberLacToReactivate: new BigNumber(numberLacToReactivate as string),
          numberLacToRegister: new BigNumber(numberLacToRegister as string),
          numberLacToUpdate: new BigNumber(numberLacToUpdate as string),
        })
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve CAKE costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return costs
}

export default useGetProfileCosts
