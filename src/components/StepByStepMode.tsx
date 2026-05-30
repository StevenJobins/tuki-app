import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

interface Step {
  text: string
  tip?: string
  image?: string
}

interface StepByStepModeProps {
  steps: Step[]
  title: string
  emoji: string
  variant: 'recipe' | 'activity'
  stars: number
  isCompleted: boolean
  onComplete: () => void
  onClose: () => void
}

export default function StepByStepMode({
  steps,
  title,
  emoji,
  variant,
  stars,
  isCompleted,
  onComplete,
  onClose,
}: StepByStepModeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const { t } = useTranslation()

  const isLastStep = currentStep === steps.length - 1
  const allStepsDone = completedSteps.size === steps.length
  const progress = ((currentStep + 1) / steps.length) * 100
  const step = steps[currentStep]

  const gradientClass = variant === 'recipe' ? 'gradient-rot' : 'gradient-mint'
  const accentText = variant === 'recipe' ? 'text-tuki-rot' : 'text-tuki-mint-dark'
  const accentBg = variant === 'recipe' ? 'bg-tuki-rot' : 'bg-tuki-mint-dark'

  function markCurrentDone() {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      next.add(currentStep)
      return next
    })
  }

  function goNext() {
    markCurrentDone()
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1)
    }
  }

  function goPrev() {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  function handleFinish() {
    markCurrentDone()
    if (!isCompleted) {
      onComplete()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="text-center flex-1 mx-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{emoji} {title}</p>
          <p className="text-xs text-gray-400">{t.stepMode.step} {currentStep + 1} / {steps.length}</p>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800">
        <motion.div
          className={`h-full ${accentBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-1.5 py-3">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`rounded-full transition-all duration-200 ${
              i === currentStep
                ? `w-6 h-2.5 ${accentBg}`
                : completedSteps.has(i)
                ? `w-2.5 h-2.5 ${accentBg} opacity-50`
                : 'w-2.5 h-2.5 bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center pt-4"
          >
            {/* Step number badge */}
            <div className={`w-14 h-14 rounded-full ${gradientClass} flex items-center justify-center mb-6 shadow-lg`}>
              <span className={`text-xl font-bold ${variant === 'recipe' ? 'text-white' : 'text-tuki-rot-dark'}`}>
                {currentStep + 1}
              </span>
            </div>

            {/* Step image */}
            {step.image && (
              <div className="w-full max-w-sm rounded-2xl overflow-hidden mb-6 shadow-md">
                <img src={step.image} alt={`Schritt ${currentStep + 1}`} className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Step text */}
            <div className="w-full max-w-md">
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed text-center">
                {step.text}
              </p>
            </div>

            {/* Step tip */}
            {step.tip && (
              <div className="w-full max-w-md mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 border border-yellow-200/50 dark:border-yellow-700/30">
                <p className="text-sm text-yellow-700 dark:text-yellow-300 text-center">
                  ð¡ {step.tip}
                </p>
              </div>
            )}

            {/* Completed check for current step */}
            {completedSteps.has(currentStep) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-6 flex items-center gap-2 text-green-600"
              >
                <span className="text-xl">â</span>
                <span className="text-sm font-medium">{t.stepMode.stepDone}</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="px-6 pb-6 pt-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        {isLastStep && completedSteps.has(currentStep) ? (
          /* Finish / Already done state */
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleFinish}
            disabled={isCompleted}
            className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'gradient-rot text-white shadow-lg shadow-tuki-rot/25'
            }`}
          >
            {isCompleted ? (
              <>ð {t.stepMode.alreadyCompleted}</>
            ) : (
              <>ð {t.stepMode.finish(stars)}</>
            )}
          </motion.button>
        ) : (
          /* Nav buttons */
          <div className="flex gap-3">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className={`flex-1 py-4 rounded-2xl font-semibold text-sm transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-600'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              â {t.stepMode.back}
            </button>
            <button
              onClick={goNext}
              className={`flex-[2] py-4 rounded-2xl font-semibold text-sm text-white ${gradientClass} shadow-lg`}
            >
              {isLastStep ? t.stepMode.done + ' â' : t.stepMode.next + ' â'}
            </button>
          </div>
        )}

        {/* Step counter below buttons */}
        <p className="text-center text-xs text-gray-400 mt-3">
          {completedSteps.size} / {steps.length} {t.stepMode.stepsCompleted}
        </p>
      </div>
    </motion.div>
  )
}
