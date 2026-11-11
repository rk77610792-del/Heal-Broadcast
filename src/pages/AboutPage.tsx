import React from 'react';
import { 
  Radio, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  Clock, 
  Headphones, 
  Users,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { startLiveStream, setIsConfessionModalOpen } = useApp();

  return (
    <div className="flex flex-col gap-8 pb-24 text-left">
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1B1826] via-[#2a1735] to-[#1B1826] border border-white/10 p-6 sm:p-10 overflow-hidden">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Radio className="w-4 h-4 text-[#FF4D8D]" />
            <span>Late Night Radio Collective</span>
          </div>
          <h1 className="font-script text-3xl sm:text-5xl text-white font-bold tracking-wide mb-3">
            About Heal Broadcast
          </h1>
          <p className="text-xs sm:text-sm text-[#E8E4F0]/90 leading-relaxed font-light">
            Founded on the quietest hour of the night, Heal Broadcast is an open-frequency harbor for vulnerable confessions, unsent letters, healing melodies, and gentle companionship. In a world rushing from one notification to the next, we slow down to listen and mend.
          </p>
        </div>
      </div>

      {/* The Story & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-[#1B1826] border border-white/6 p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-[#FF4D8D] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            100% Radical Anonymity
          </h3>
          <p className="text-xs text-[#8C86A0] leading-relaxed">
            No real identities, no invasive tracking. Only gentle aliases and honest words. When there is no ego to defend, people can finally be themselves.
          </p>
        </div>

        <div className="rounded-2xl bg-[#1B1826] border border-white/6 p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-[#8B5CF6] flex items-center justify-center">
            <Heart className="w-5 h-5 fill-[#8B5CF6]" />
          </div>
          <h3 className="text-base font-bold text-white">
            Softness as Strength
          </h3>
          <p className="text-xs text-[#8C86A0] leading-relaxed">
            Our community is strictly moderated by compassion. Sarcasm and cynicism are paused at the door; empathy and attentive listening take the microphone.
          </p>
        </div>

        <div className="rounded-2xl bg-[#1B1826] border border-white/6 p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Every Heart Has a Frequency
          </h3>
          <p className="text-xs text-[#8C86A0] leading-relaxed">
            Whether you are falling head over heels, picking up pieces after heartbreak, or cherishing solitude, there is a room and an episode that speaks your dialect.
          </p>
        </div>
      </div>

      {/* Broadcast Schedule */}
      <div className="rounded-3xl bg-[#14121C] border border-white/10 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#FF4D8D]" />
          <h2 className="text-lg font-bold text-white">
            Midnight Broadcast Schedule (98.4 FM)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/5">
            <span className="text-[#FF4D8D] font-bold block mb-1">Wednesday & Friday</span>
            <strong className="text-white text-sm block">11:00 PM — 1:00 AM</strong>
            <span className="text-[#8C86A0] mt-1 block">Live Confessions & Listener Calls with Maya & Julian.</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/5">
            <span className="text-purple-400 font-bold block mb-1">Saturday Night</span>
            <strong className="text-white text-sm block">12:00 AM — 2:30 AM</strong>
            <span className="text-[#8C86A0] mt-1 block">Lofi Electric Piano & Unsent Letters live reading session.</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/5">
            <span className="text-cyan-400 font-bold block mb-1">Sunday Sunset</span>
            <strong className="text-white text-sm block">7:00 PM — 8:30 PM</strong>
            <span className="text-[#8C86A0] mt-1 block">Healing & Psychology deep dive with therapist guests.</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#1B1826] border border-white/5">
            <span className="text-emerald-400 font-bold block mb-1">24/7 Automated Stream</span>
            <strong className="text-white text-sm block">Always On Air</strong>
            <span className="text-[#8C86A0] mt-1 block">Continuous soothing ambient music and live chatroom.</span>
          </div>
        </div>
      </div>

      {/* Host Profiles */}
      <div className="rounded-3xl bg-[#14121C] border border-white/10 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white mb-4">
          Your Midnight Hosts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#1B1826] border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-lg shrink-0">
              M
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Maya Lin</h3>
              <span className="text-[11px] text-pink-300">Co-founder & Host</span>
              <p className="text-xs text-[#8C86A0] mt-1 leading-relaxed">
                Poet and former community radio DJ. Loves Earl Grey tea with lavender and stories that take place on rainy trains.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#1B1826] border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              J
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Julian Vance</h3>
              <span className="text-[11px] text-purple-300">Co-founder & Sound Designer</span>
              <p className="text-xs text-[#8C86A0] mt-1 leading-relaxed">
                Vinyl archivist and sound engineer. Hand-selects each soothing background progression and curates listener audio tapes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
