import { zodResolver } from '@hookform/resolvers/zod'
import { Github } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl } from './components/FormControl'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Separator } from './components/ui/separator'

const billFormSchema = z.object({
  days: z.coerce.number().int().positive().min(1).max(30),
  person: z.coerce.number().int().positive().min(1).max(4),
  waterBill: z.coerce.number().positive().min(1),
  energyBill: z.coerce.number().positive().min(1),
  internetBill: z.coerce.number().positive().min(1),
  rent: z.coerce.number().positive().min(1),
  others: z.coerce.number().positive().min(1),
})

type BillFormData = z.infer<typeof billFormSchema>

export function App() {
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
    },
  })

  function onSubmit(data: BillFormData) {
    console.log(data)
  }

  return (
    <main className="h-screen flex flex-col">
      <header className="flex justify-between items-center border-b py-4 px-2">
        <h1 className="font-bold text-lg">Calculadora do aluguel</h1>
        <Button asChild variant="outline" size="icon">
          <a
            href="https://github.com/GabriPires/calculadora-aluguel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </Button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 p-4"
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
          <Input {...register('days')} />
        </FormControl>

        <Separator />

        <FormControl
          label="Valor do aluguel"
          htmlFor="rent"
          errorMessage={errors.rent?.message}
        >
          <Input {...register('rent')} />
        </FormControl>

        <FormControl
          label="Valor da conta de água"
          htmlFor="waterBill"
          errorMessage={errors.waterBill?.message}
        >
          <Input {...register('waterBill')} />
        </FormControl>

        <FormControl
          label="Valor da conta de energia"
          htmlFor="energyBill"
          errorMessage={errors.energyBill?.message}
        >
          <Input {...register('energyBill')} />
        </FormControl>

        <FormControl
          label="Valor da conta de internet"
          htmlFor="internetBill"
          errorMessage={errors.internetBill?.message}
        >
          <Input {...register('internetBill')} />
        </FormControl>

        <Separator />

        <FormControl
          label="Outros gastos"
          htmlFor="others"
          errorMessage={errors.others?.message}
        >
          <Input {...register('others')} />
        </FormControl>

        <Separator />

        <Button type="submit">Calcular</Button>
      </form>
    </main>
  )
}
