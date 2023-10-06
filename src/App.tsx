import { zodResolver } from '@hookform/resolvers/zod'
import { Github } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl } from './components/FormControl'
import { ModeToggle } from './components/ModeToggle'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Separator } from './components/ui/separator'

const billFormSchema = z.object({
  days: z.coerce.number().int().positive().min(1).max(30),
  person: z.coerce.number().int().positive().min(1).max(4),
  waterBill: z.coerce.number().min(0),
  energyBill: z.coerce.number().min(0),
  internetBill: z.coerce.number().min(0),
  rent: z.coerce.number().min(0),
  others: z.coerce.number().min(0),
})

type BillFormData = z.infer<typeof billFormSchema>

export function App() {
  const [totalToRent, setTotalToRent] = useState(0)
  const [totalToBills, setTotalToBills] = useState(0)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BillFormData>({
    resolver: zodResolver(billFormSchema),
    defaultValues: {
      person: 3,
      days: 8,
      rent: 1000,
      others: 0,
    },
  })

  function onSubmit(data: BillFormData) {
    const percentageOfUsedDaysInMonth = data.days / 30
    const totalToRent = (data.rent * percentageOfUsedDaysInMonth) / data.person

    setTotalToRent(totalToRent)

    const totalToBills =
      (data.waterBill + data.energyBill + data.internetBill + data.others) /
      data.person

    setTotalToBills(totalToBills)
  }

  return (
    <main className="h-screen flex flex-col">
      <header className="flex justify-between items-center border-b p-4">
        <h1 className="font-bold text-lg">Calculadora do aluguel</h1>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild variant="outline" size="icon">
            <a
              href="https://github.com/GabriPires/calculadora-aluguel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          </Button>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 p-4 md:max-w-lg md:min-w-[32rem] md:mx-auto"
      >
        <FormControl
          label="Dividir por quantas pessoas?"
          htmlFor="person"
          errorMessage={errors.person?.message}
        >
          <Input type="number" {...register('person')} />
        </FormControl>

        <FormControl
          label="Quantos dias foram usados?"
          htmlFor="days"
          errorMessage={errors.days?.message}
        >
          <Input type="number" {...register('days')} />
        </FormControl>

        <Separator />

        <FormControl
          label="Valor do aluguel"
          htmlFor="rent"
          errorMessage={errors.rent?.message}
        >
          <Input type="number" {...register('rent')} />
        </FormControl>

        <FormControl
          label="Valor da conta de água"
          htmlFor="waterBill"
          errorMessage={errors.waterBill?.message}
        >
          <Input type="number" {...register('waterBill')} />
        </FormControl>

        <FormControl
          label="Valor da conta de energia"
          htmlFor="energyBill"
          errorMessage={errors.energyBill?.message}
        >
          <Input type="number" {...register('energyBill')} />
        </FormControl>

        <FormControl
          label="Valor da conta de internet"
          htmlFor="internetBill"
          errorMessage={errors.internetBill?.message}
        >
          <Input type="number" {...register('internetBill')} />
        </FormControl>

        <Separator />

        <FormControl
          label="Outros gastos"
          htmlFor="others"
          errorMessage={errors.others?.message}
        >
          <Input type="number" {...register('others')} />
        </FormControl>

        <Separator />

        <Button type="submit">Calcular</Button>

        <div className="grid grid-cols-2 w-full gap-2 md:mt-auto">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Valor do aluguel</h2>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalToRent)}
            </span>
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Valor das contas</h2>
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalToBills)}
            </span>
          </div>
        </div>
      </form>
    </main>
  )
}
