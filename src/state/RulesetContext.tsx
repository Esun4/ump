import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RulesetId } from '../types';
import { loadActiveRuleset, saveActiveRuleset } from '../srs/storage';

interface RulesetContextValue {
  ruleset: RulesetId;
  setRuleset: (r: RulesetId) => void;
}

const RulesetContext = createContext<RulesetContextValue>({
  ruleset: 'obr',
  setRuleset: () => {},
});

export function RulesetProvider({ children }: { children: React.ReactNode }) {
  const [ruleset, setRulesetState] = useState<RulesetId>('obr');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadActiveRuleset().then((r) => {
      setRulesetState(r);
      setLoaded(true);
    });
  }, []);

  const setRuleset = useCallback((r: RulesetId) => {
    setRulesetState(r);
    void saveActiveRuleset(r);
  }, []);

  if (!loaded) return null;

  return (
    <RulesetContext.Provider value={{ ruleset, setRuleset }}>
      {children}
    </RulesetContext.Provider>
  );
}

export function useRuleset(): RulesetContextValue {
  return useContext(RulesetContext);
}
