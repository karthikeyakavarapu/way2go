import React, { useState } from 'react';
import { Plus, Footprints, Bus, Train, Car, Bike, CheckCircle2, Trash2, X } from 'lucide-react';
import type { TransportMode, RouteStepDraft } from '../../types';
import { useJourney } from '../../context/JourneyContext';

interface SimpleRouteBuilderProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const SimpleRouteBuilder: React.FC<SimpleRouteBuilderProps> = ({ onClose, onSuccess }) => {
  const { finishRecordingAndPublish } = useJourney();

  const [origin, setOrigin] = useState('SRM Ramapuram Campus');
  const [destination, setDestination] = useState('Puducherry Bus Stand');

  // Steps timeline
  const [steps, setSteps] = useState<RouteStepDraft[]>([
    {
      id: 'step-1',
      step_number: 1,
      transport_mode: 'walk',
      title: 'Walk to Mount Poonamallee Bus Stop',
      start_point: 'SRM Ramapuram Gate 2',
      end_point: 'Mount Poonamallee Bus Stop',
      instruction: 'Exit Gate 2 and walk 250m toward main road bus shelter.',
      distance_meters: 250,
      estimated_minutes: 4,
      cost_inr: 0,
      note: 'Bus stop is near the tea stall.'
    }
  ]);

  // Active step builder state
  const [selectedMode, setSelectedMode] = useState<TransportMode>('bus');
  const [stepStartPoint, setStepStartPoint] = useState('Mount Poonamallee Bus Stop');
  const [stepEndPoint, setStepEndPoint] = useState('Guindy Bus Bay');
  const [busNumber, setBusNumber] = useState('88K');
  const [metroLine, setMetroLine] = useState('Blue Line');
  const [direction, setDirection] = useState('Guindy / Broadway');
  const [fare, setFare] = useState(15);
  const [stepNote, setStepNote] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleAddStep = () => {
    let title = `${selectedMode.toUpperCase()} to ${stepEndPoint}`;
    let instruction = `Travel via ${selectedMode.toUpperCase()} from ${stepStartPoint} to ${stepEndPoint}.`;

    if (selectedMode === 'bus') {
      title = `Bus ${busNumber} to ${stepEndPoint}`;
      instruction = `Board Bus ${busNumber} toward ${direction} at ${stepStartPoint}. Get down at ${stepEndPoint}.`;
    } else if (selectedMode === 'metro') {
      title = `Metro (${metroLine}) to ${stepEndPoint}`;
      instruction = `Take ${metroLine} Metro toward ${direction}. Exit at ${stepEndPoint}.`;
    } else if (selectedMode === 'walk') {
      title = `Walk to ${stepEndPoint}`;
      instruction = `Walk from ${stepStartPoint} to ${stepEndPoint}.`;
    }

    const distMeters = 500;
    const newStep: RouteStepDraft = {
      id: `step-${Date.now()}`,
      step_number: steps.length + 1,
      transport_mode: selectedMode,
      title,
      start_point: stepStartPoint,
      end_point: stepEndPoint,
      instruction,
      distance_meters: distMeters,
      estimated_minutes: Math.round(distMeters / 300) || 5,
      cost_inr: fare,
      bus_number: busNumber,
      metro_line: metroLine,
      direction,
      note: stepNote,
      photo_url: photoUrl
    };

    setSteps(prev => [...prev, newStep]);
    setStepStartPoint(stepEndPoint);
    setStepEndPoint('');
    setStepNote('');
    setPhotoUrl('');
  };

  const handleRemoveStep = (id: string) => {
    setSteps(prev => prev.filter(s => s.id !== id));
  };

  const handlePublishRoute = () => {
    const title = `${origin} to ${destination} Traveller Guide`;
    finishRecordingAndPublish(title, origin, destination);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="glass-panel p-5 sm:p-6 rounded-3xl max-w-lg w-full border border-sky-500/40 bg-slate-950 space-y-5 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-100">+ CREATE TRAVELLER ROUTE</h2>
              <p className="text-[11px] text-slate-400 font-mono">Simple step-by-step mobile journey builder</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 & 2: Origin and Destination */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Starting Point</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-100 font-bold"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-100 font-bold"
            />
          </div>
        </div>

        {/* Timeline of Added Steps */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold text-slate-300">JOURNEY TIMELINE STEPS ({steps.length})</h3>
          
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {steps.map((step, idx) => (
              <div key={step.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
                      STEP {idx + 1}: {step.transport_mode}
                    </span>
                    <span className="font-bold text-slate-200">{step.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{step.instruction}</p>
                  {step.note && <p className="text-[10px] text-amber-300 italic">📝 Note: {step.note}</p>}
                </div>

                <button onClick={() => handleRemoveStep(step.id)} className="text-rose-400 hover:text-rose-300 p-1 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Next Step Selector */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-extrabold text-sky-400 uppercase tracking-wide">
            + ADD NEXT STEP (How did you travel?)
          </h3>

          {/* Mode Icons Selector */}
          <div className="grid grid-cols-5 gap-1.5 text-xs">
            <button
              onClick={() => setSelectedMode('walk')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                selectedMode === 'walk' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Footprints className="w-4 h-4" />
              <span className="text-[10px]">Walk</span>
            </button>

            <button
              onClick={() => setSelectedMode('bus')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                selectedMode === 'bus' ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span className="text-[10px]">Bus</span>
            </button>

            <button
              onClick={() => setSelectedMode('metro')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                selectedMode === 'metro' ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Train className="w-4 h-4" />
              <span className="text-[10px]">Metro</span>
            </button>

            <button
              onClick={() => setSelectedMode('auto')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                selectedMode === 'auto' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Car className="w-4 h-4" />
              <span className="text-[10px]">Auto</span>
            </button>

            <button
              onClick={() => setSelectedMode('bicycle')}
              className={`p-2 rounded-xl border flex flex-col items-center gap-1 font-bold ${
                selectedMode === 'bicycle' ? 'bg-teal-500/20 border-teal-400 text-teal-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span className="text-[10px]">Bike</span>
            </button>
          </div>

          {/* Dynamic Transport Form */}
          <div className="space-y-2 text-xs pt-1">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={stepStartPoint}
                onChange={(e) => setStepStartPoint(e.target.value)}
                placeholder="From Stop / Station"
                className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
              />
              <input
                type="text"
                value={stepEndPoint}
                onChange={(e) => setStepEndPoint(e.target.value)}
                placeholder="To Stop / Station"
                className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
              />
            </div>

            {selectedMode === 'bus' && (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  placeholder="Bus No (e.g. 88K / 21G)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
                />
                <input
                  type="text"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  placeholder="Direction (e.g. Guindy)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
                />
              </div>
            )}

            {selectedMode === 'metro' && (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={metroLine}
                  onChange={(e) => setMetroLine(e.target.value)}
                  placeholder="Line (e.g. Blue Line)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
                />
                <input
                  type="text"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  placeholder="Direction (e.g. Airport)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={fare}
                onChange={(e) => setFare(parseInt(e.target.value) || 0)}
                placeholder="Fare (₹)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
              />
              <input
                type="text"
                value={stepNote}
                onChange={(e) => setStepNote(e.target.value)}
                placeholder="Tip Note for next traveller..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-100"
              />
            </div>

            <button
              onClick={handleAddStep}
              className="w-full py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>SAVE STEP TO TIMELINE</span>
            </button>
          </div>
        </div>

        {/* Final Publish Button */}
        <button
          onClick={handlePublishRoute}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>PUBLISH ROUTE FOR TRAVELLERS</span>
        </button>

      </div>
    </div>
  );
};
