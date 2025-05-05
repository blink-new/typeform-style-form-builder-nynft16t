import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { PlusCircle, Type, ListChecks } from 'lucide-react'

interface Question {
  id: string
  type: 'text' | 'choice'
  title: string
}

export function FormBuilder() {
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = (type: 'text' | 'choice') => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substring(7),
      type,
      title: 'Untitled Question'
    }
    setQuestions([...questions, newQuestion])
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Builder Panel */}
      <div className="w-1/3 p-6 border-r bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Form Builder</h2>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => addQuestion('text')}
            >
              <Type size={16} />
              Add Text
            </Button>
            <Button 
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => addQuestion('choice')}
            >
              <ListChecks size={16} />
              Add Choice
            </Button>
          </div>

          <div className="space-y-3 mt-6">
            {questions.map((question) => (
              <Card key={question.id} className="p-4 cursor-move hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  {question.type === 'text' ? <Type size={16} /> : <ListChecks size={16} />}
                  <span>{question.title}</span>
                </div>
              </Card>
            ))}
            
            {questions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <PlusCircle className="mx-auto h-12 w-12 mb-3 opacity-50" />
                <p>Add your first question</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preview</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 min-h-[400px]">
            {questions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Your form preview will appear here</p>
              </div>
            ) : (
              <div className="space-y-8">
                {questions.map((question) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="text-xl font-medium">{question.title}</h3>
                    {question.type === 'text' ? (
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg"
                        placeholder="Type your answer here..."
                      />
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="radio" name={`q-${question.id}`} />
                          <label>Option 1</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" name={`q-${question.id}`} />
                          <label>Option 2</label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}