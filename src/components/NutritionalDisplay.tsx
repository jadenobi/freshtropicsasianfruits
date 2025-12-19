'use client'

interface NutritionInfo {
  calories?: number
  protein?: number
  carbs?: number
  fiber?: number
  vitaminC?: number
  potassium?: number
  antioxidants?: string[]
  benefits?: string[]
}

interface NutritionalDisplayProps {
  productName: string
  nutrition?: NutritionInfo
}

export default function NutritionalDisplay({ productName, nutrition }: NutritionalDisplayProps) {
  if (!nutrition) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h3 className="font-black text-gray-900 mb-3">🔬 Nutrition Information</h3>
        <p className="text-gray-600 text-sm">Detailed nutrition facts coming soon for {productName}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-3 border-blue-200 rounded-lg p-6 space-y-4">
      <h3 className="font-black text-lg text-gray-900">🔬 Nutrition Information</h3>

      {/* Per Serving Macros */}
      {(nutrition.calories || nutrition.protein || nutrition.carbs || nutrition.fiber) && (
        <div className="bg-white rounded-lg p-4 space-y-3">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Per Serving</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {nutrition.calories && (
              <div className="text-center">
                <p className="text-2xl font-black text-blue-600">{nutrition.calories}</p>
                <p className="text-xs text-gray-600 font-semibold">Calories</p>
              </div>
            )}
            
            {nutrition.protein && (
              <div className="text-center">
                <p className="text-2xl font-black text-green-600">{nutrition.protein}g</p>
                <p className="text-xs text-gray-600 font-semibold">Protein</p>
              </div>
            )}
            
            {nutrition.carbs && (
              <div className="text-center">
                <p className="text-2xl font-black text-amber-600">{nutrition.carbs}g</p>
                <p className="text-xs text-gray-600 font-semibold">Carbs</p>
              </div>
            )}
            
            {nutrition.fiber && (
              <div className="text-center">
                <p className="text-2xl font-black text-emerald-600">{nutrition.fiber}g</p>
                <p className="text-xs text-gray-600 font-semibold">Fiber</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Nutrients */}
      {(nutrition.vitaminC || nutrition.potassium) && (
        <div className="bg-white rounded-lg p-4 space-y-2">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Key Nutrients</p>
          
          <div className="space-y-2">
            {nutrition.vitaminC && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">🍊 Vitamin C</span>
                <span className="font-black text-orange-600">{nutrition.vitaminC}% DV</span>
              </div>
            )}
            
            {nutrition.potassium && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">⚡ Potassium</span>
                <span className="font-black text-yellow-600">{nutrition.potassium}% DV</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Antioxidants */}
      {nutrition.antioxidants && nutrition.antioxidants.length > 0 && (
        <div className="bg-white rounded-lg p-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Powerful Antioxidants</p>
          <div className="flex flex-wrap gap-2">
            {nutrition.antioxidants.map((antioxidant, idx) => (
              <span 
                key={idx}
                className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full"
              >
                {antioxidant}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Health Benefits */}
      {nutrition.benefits && nutrition.benefits.length > 0 && (
        <div className="bg-white rounded-lg p-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Health Benefits</p>
          <ul className="space-y-2">
            {nutrition.benefits.map((benefit, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="text-lg">✓</span>
                <span className="text-sm text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
